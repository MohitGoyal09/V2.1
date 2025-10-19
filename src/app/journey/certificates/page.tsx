import CertificatesGallery from '@/components/CertificatesGallery';
import Container from '@/components/common/Container';
import { Separator } from '@/components/ui/separator';
import { certificates as configuredCertificates } from '@/config/Achievements';
import { generateMetadata as getMetadata } from '@/config/Meta';
import fs from 'fs';
import { Metadata } from 'next';
import path from 'path';
import React from 'react';

export const metadata: Metadata = {
  ...getMetadata('/journey/certificates'),
  robots: { index: true, follow: true },
};

export default function CertificatesPage() {
  // Server-side: auto-discover certificate images placed under public/certificates
  const certDir = path.join(process.cwd(), 'public', 'certificates');
  let discovered: {
    file: string;
    title?: string;
    issuer?: string;
    date?: string;
  }[] = [];
  try {
    if (fs.existsSync(certDir)) {
      const files = fs.readdirSync(certDir);
      discovered = files
        .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
        .map((f) => ({
          file: `/certificates/${f}`,
          title: undefined,
          issuer: undefined,
          date: undefined,
        }));
    }
  } catch {
    // ignore errors and render configured certificates only
    discovered = [];
  }

  // Merge configured certificates with discovered ones (configured entries take precedence)
  const configured = Array.isArray(configuredCertificates)
    ? configuredCertificates
    : [];
  // Build map to avoid duplicates by file path
  const map = new Map<
    string,
    { file: string; title?: string; issuer?: string; date?: string }
  >();
  configured.forEach(
    (c: { file: string; title?: string; issuer?: string; date?: string }) =>
      map.set(c.file, c),
  );
  discovered.forEach((d) => {
    if (!map.has(d.file)) map.set(d.file, d);
  });

  return (
    <Container className="py-8 md:py-16">
      <div className="space-y-6 md:space-y-8">
        <div className="space-y-3 md:space-y-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Certificates & Achievements
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground px-4">
            A curated list of my certificates and notable achievements.
          </p>
        </div>
        <Separator />

        <div className="space-y-8 md:space-y-12">
          <p className="text-sm text-muted-foreground">
            Add certificates (PNG/JPEG) to{' '}
            <code className="font-mono">public/certificates</code> or register
            them in{' '}
            <code className="font-mono">src/config/Achievements.tsx</code>.
            Files placed in the directory are auto-discovered and displayed
            here.
          </p>

          <CertificatesGallery />
        </div>
      </div>
    </Container>
  );
}
