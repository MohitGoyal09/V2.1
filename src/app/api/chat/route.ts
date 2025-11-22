import { systemPrompt } from '@/config/ChatPrompt';
import { createParser } from 'eventsource-parser';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

const chatSchema = z.object({
  message: z.string().min(1).max(500),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'model']),
        parts: z.array(z.object({ text: z.string() })),
      }),
    )
    .optional()
    .default([]),
});

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return 'unknown';
}

function checkRateLimit(clientIP: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const clientData = rateLimitStore.get(clientIP);

  if (!clientData || now > clientData.resetTime) {
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  clientData.count++;
  rateLimitStore.set(clientIP, clientData);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count,
  };
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter: RATE_LIMIT_WINDOW / 1000,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': (Date.now() + RATE_LIMIT_WINDOW).toString(),
          },
        },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 },
      );
    }

    const body = await request.json();
    const validatedData = chatSchema.parse(body);

    // Prepare the request body for Gemini REST API
    const requestBody = {
      contents: [
        {
          parts: [{ text: systemPrompt }],
          role: 'user',
        },
        {
          parts: [
            { text: 'I understand. I will act as your portfolio assistant.' },
          ],
          role: 'model',
        },
        // Add conversation history
        ...validatedData.history,
        // Add current message
        {
          parts: [{ text: validatedData.message }],
          role: 'user',
        },
      ],
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:streamGenerateContent?alt=sse&key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // Try to get error details from response
      let errorMessage = `Gemini API error: ${response.status}`;
      let errorDetails: any = null;

      try {
        const errorBody = await response.text();
        if (errorBody) {
          try {
            errorDetails = JSON.parse(errorBody);
            errorMessage = errorDetails?.error?.message || errorDetails?.message || errorMessage;
          } catch {
            errorMessage = errorBody || errorMessage;
          }
        }
      } catch {
        // If we can't read the error body, use the status code
      }

      // Handle rate limiting (429) specifically
      if (response.status === 429) {
        const retryAfter = response.headers.get('retry-after');
        return NextResponse.json(
          {
            error: 'Gemini API rate limit exceeded. Please try again later.',
            message: errorMessage,
            retryAfter: retryAfter ? parseInt(retryAfter, 10) : 60,
          },
          {
            status: 429,
            headers: {
              'Retry-After': retryAfter || '60',
            },
          },
        );
      }

      // For other errors, throw with more details
      const error = new Error(errorMessage) as Error & { status?: number; details?: any };
      error.status = response.status;
      error.details = errorDetails;
      throw error;
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const parser = createParser({
            onEvent: (event) => {
              try {
                const data = JSON.parse(event.data);
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                  // Send as Server-Sent Event format
                  const sseData = `data: ${JSON.stringify({ text })}\n\n`;
                  controller.enqueue(encoder.encode(sseData));
                }
              } catch (parseError) {
                console.error('Parse error:', parseError);
              }
            },
          });

          if (!response.body) {
            throw new Error('No response body');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            parser.feed(decoder.decode(value));
          }

          // Send completion signal
          controller.enqueue(encoder.encode('data: {"done": true}\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          const errorData = `data: ${JSON.stringify({ error: 'Stream error occurred' })}\n\n`;
          controller.enqueue(encoder.encode(errorData));
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
        'X-RateLimit-Remaining': rateLimit.remaining.toString(),
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: error.errors,
        },
        { status: 400 },
      );
    }

    // Handle errors with status codes (like Gemini API errors)
    if (error && typeof error === 'object' && 'status' in error) {
      const statusError = error as Error & { status?: number; details?: any };
      return NextResponse.json(
        {
          error: (statusError as any)?.message || 'API request failed',
          details: statusError.details,
        },
        { status: statusError.status || 500 },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
