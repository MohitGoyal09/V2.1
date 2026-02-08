import AWS from '@/components/technologies/AWS';
import Crewai from '@/components/technologies/Crewai';
import Fastapi from '@/components/technologies/Fastapi';
import LangGraph from '@/components/technologies/LangGraph';
import Langchain from '@/components/technologies/Langchain';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import Pytorch from '@/components/technologies/Pytorch';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  paper?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
    company: 'C3alabs',
    position: 'Software Engineering Intern',
    location: 'United States (Remote)',
    image: '/company/c3alabs.jpg',
    description: [
      '*Built and deployed production-grade AI systems* at C3ALabs, focusing on reliability, latency, and real-user usage not demos.',
      '*Developed agentic AI features* (artifacts, agent skills, multi-agent orchestration) and shipped them to production, ensuring performance under real-world constraints.',
      '*Designed and productionized advanced RAG pipelines* using Google File Search APIs, handling document chunking, retrieval quality, and response grounding in production environments.',
      '*Core contributor to applied AI R&D* experimented with Claude skills, MCP-based tool routing (Composio), and multi-agent coordination patterns, turning research ideas into deployable systems.',
    ],
    startDate: 'October 2025',
    endDate: 'Present',
    technologies: [
      {
        name: 'Langchain',
        href: 'https://langchain.com/',
        icon: <Langchain />,
      },
      {
        name: 'LangGraph',
        href: 'https://langgraph.dev/',
        icon: <LangGraph />,
      },

      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },

      {
        name: 'Fastapi  ',
        href: 'https://fastapi.tiangolo.com/',
        icon: <Fastapi />,
      },
    ],
    website: 'https://www.c3alabs.com/',
    linkedin: 'https://www.linkedin.com/company/c3alabs',
    // github: 'https://github.com/Kartavya-AI',
  },

  {
    isCurrent: true,
    company: 'RAAPID INC',
    position: 'ML Researcher Intern',
    location: 'Louisville, US (Remote)',
    image: '/company/raapid.png',
    description: [
      '*Co-authored a research paper on Large Language Model (LLM) fine-tuning* - <a href="https://arxiv.org/abs/2601.00231" target="_blank" class="text-blue-400 hover:underline">arXiv:2601.00231</a>',
      '*Developed GRIT (Geometric Reprojection Instruction Tuning)* a framework fine-tuning only *0.997% of LLM parameters* while *outperforming full fine-tuning and LoRA* on standard benchmarks.',
      '*Fine-tuned multiple LLMs* (GPT-2 355M, LLaMA-3B, Mistral-7B) achieving *30% parameter savings* with *40% reduction in compute & memory costs* without compromising accuracy.',
      "*Conducted extensive ablation studies* validating GRIT's *geometry-aware updates* over LoRA, QLoRA, and AdaLoRA.",
      '*Benchmarked GRIT* across diverse NLP tasks on datasets including Alpaca, Dolly-15k, BoolQ, and GSM8K.',
    ],
    startDate: 'April 2025',
    endDate: 'Present',
    website: 'https://www.raapidinc.com/',
    paper: 'https://arxiv.org/abs/2601.00231',
    technologies: [
      {
        name: 'Pytorch',
        href: 'https://pytorch.org/',
        icon: <Pytorch />,
      },
    ],
    linkedin: 'https://www.linkedin.com/company/raapid',
  },
  {
    isCurrent: false,
    company: 'Kartavya Technology',
    position: 'AI Agent Developer Intern',
    location: 'Bengaluru, India (Remote)',
    image: '/company/Kartavya.jpg',
    description: [
      '*Autonomous Market Research Agent*: Developed an agent that automates market and competitor research using real-time data collection, web search, and report generation for business insights.',
      '*AI Voice Interviewer*: Built and deployed a voice-based AI interviewer to conduct inbound calls, capture candidate responses, and generate structured interview summaries.',
      '*Personalized Front Desk Agent*: Created a multimodal front desk AI agent capable of handling text, voice, and video inquiries for customer support and client onboarding processes.',
      '*Whatsapp and Social Media Automation Agent*: Engineered agents that automate group administration, content posting, and engagement analysis on WhatsApp and other social platforms.',
      '*Credit Risk Analysis Agent*: Designed a credit risk agent using custom ML models to evaluate applicant default risk and streamline lending decisions with automated scoring and documentation.',
      '*Outbound Calling Platform Agent*: Deployed outbound calling agents capable of scheduling, executing, and logging calls for lead generation and customer feedback with seamless voice pipeline integration.',
    ],
    startDate: 'June 2025',
    endDate: 'August 2025',
    technologies: [
      {
        name: 'Crewai',
        href: 'https://crewai.org/',
        icon: <Crewai />,
      },
      {
        name: 'Langchain',
        href: 'https://langchain.com/',
        icon: <Langchain />,
      },
      {
        name: 'LangGraph',
        href: 'https://langgraph.dev/',
        icon: <LangGraph />,
      },

      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'Node.js',
        href: 'https://nodejs.org/',
        icon: <NodeJs />,
      },

      {
        name: 'Fastapi  ',
        href: 'https://fastapi.tiangolo.com/',
        icon: <Fastapi />,
      },

      {
        name: 'AWS',
        href: 'https://aws.amazon.com/',
        icon: <AWS />,
      },
    ],
    website: 'https://kartavya.tech',
    linkedin: 'https://www.linkedin.com/company/kartavyatech',
    github: 'https://github.com/Kartavya-AI',
  },
];
