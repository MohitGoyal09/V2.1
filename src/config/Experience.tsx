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
  technologies: Technology[];
  isCurrent: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: true,
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
    endDate: 'Present',
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
  {
    isCurrent: true,
    company: 'RAAPID INC',
    position: 'ML Researcher Intern',
    location: 'Louisville, US (Remote)',
    image: '/company/raapid.png',
    description: [
      '*Worked on Large Language Model (LLM) fine-tuning* and co-authored a research paper introducing a novel instruction tuning framework.',
      '*Co-developed GRIT (Geometric Reprojection Instruction Tuning)*, a novel framework that fine-tunes only *0.997% of LLM parameters* while outperforming full fine-tuning and LoRA on standard benchmarks (*BLEU ↑26.2, ROUGE-L ↑34.9 on Alpaca*).',
      'Fine-tuned multiple LLMs (*GPT-2 355M, LLaMA-3B, Mistral-7B*) achieving **30% parameter savings** with **40% reduction in compute & memory costs**, without compromising accuracy.',
      'Conducted extensive ablation studies, validating GRIT’s *geometry-aware updates* with **+2.1 BLEU and +2.5 ROUGE-L gains** over LoRA, QLoRA, and AdaLoRA.',
      'Benchmarked GRIT across diverse NLP tasks (*abstractive QA, classification, reasoning*) on datasets such as **Alpaca, Dolly-15k, BoolQ, GSM8K**, consistently outperforming existing parameter-efficient tuning methods.',
      'Collaborated on research paper drafting, presenting *GRIT as a scalable and efficient alternative* for instruction tuning in large-scale LLMs.',
    ],
    startDate: 'April 2025',
    endDate: 'Present',
    website: 'https://www.raapidinc.com/',
    technologies: [
      {
        name: 'Pytorch',
        href: 'https://pytorch.org/',
        icon: <Pytorch />,
      },
    ],
    linkedin: 'https://www.linkedin.com/company/raapid',
  },
];
