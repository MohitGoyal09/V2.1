import Fastapi from '@/components/technologies/Fastapi';
import NextJs from '@/components/technologies/NextJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import Pytorch from '@/components/technologies/Pytorch';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'MemexLLM',
    description:
      'A production-ready RAG-powered document intelligence platform that enables users to upload documents, chat with AI using intelligent retrieval, and generate content with proper citations. Features hybrid search, reranking, and secure document processing.',
    image: '/project/memexllm.jpg',
    video: '',
    link: 'https://memexllm.xyz',
    technologies: [
      { name: 'Next.js 16', icon: <NextJs key="nextjs" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'FastAPI', icon: <Fastapi key="fastapi" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
    ],
    github: 'https://github.com/MohitGoyal09/memexllm',
    live: 'https://memexllm.xyz',
    details: true,
    projectDetailsPageSlug: '/projects/memexllm',
    isWorking: true,
    category: 'full-stack',
    secondaryCategory: 'ai',
  },
  {
    title: 'Artificial Guruji',
    description:
      'Artificial Guruji is an AI-powered exam preparation platform that uses advanced AI to generate personalised study materials and customised study schedules. It helps users to improve test scores, adapt to individual learning styles, and save preparation time. The platform has over 50,000 users and is used in over 100 universities.',
    image: '/project/lms.jpg',
    video: '',
    link: 'https://guruji-chi.vercel.app/',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Prisma', icon: <Prisma key="prisma" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/MohitGoyal09/lms',
    live: 'https://lms-three-theta.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/artificial-guruji',
    isWorking: true,
    category: 'full-stack',
    secondaryCategory: 'ai',
  },
  
  {
    title: 'GuardianReport',
    description:
      "GuardianReport is a system for secure and anonymous incident reporting that uses military-grade encryption to protect the reporter's identity. It provides a two-way anonymous communication channel with law enforcement, and offers real-time processing of reports. The system has a 100% anonymity rate, has processed over 100,000 reports, and offers 24/7 support.",
    image: '/project/report.jpg',
    video: '',
    link: 'https://safe-report-omega.vercel.app/',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
      { name: 'Prisma', icon: <Prisma key="prisma" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/MohitGoyal09/GuardianReport',
    live: 'https://safe-report-omega.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/guardian-report',
    isWorking: true,
    category: 'full-stack',
    secondaryCategory: 'ai',
  },
  {
    title: 'Music Academy',
    description:
      'Built a responsive and visually appealing landing page for a music institution using Next.js and Acerenity UI. This project demonstrates expertise in creating clean, modern designs with seamless navigation and optimized performance.',
    image: '/project/music.jpg',
    video: '',
    link: 'https://musicacademy-iota.vercel.app/',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/MohitGoyal09/musicacademy',
    live: 'https://musicacademy-iota.vercel.app/',
    details: true,
    projectDetailsPageSlug: '/projects/music-academy',
    isWorking: true,
    category: 'frontend',
  },
  {
    title: 'Food Vision Transformer',
    description:
      'Built a Vision Transformer (ViT) model to efficiently classify images using self-attention mechanisms. Implemented with PyTorch and fine-tuned on a curated dataset, achieving high accuracy. This project demonstrates proficiency in transformer-based architectures and advanced deep learning techniques for visual tasks.',
    image: '/project/gradio.jpg',
    video: '',
    link: 'https://github.com/MohitGoyal09/FoodVison-Big',
    technologies: [{ name: 'PyTorch', icon: <Pytorch key="pytorch" /> }],
    github: 'https://github.com/MohitGoyal09/FoodVison-Big',
    live: 'https://github.com/MohitGoyal09/FoodVison-Big',
    details: true,
    projectDetailsPageSlug: '/projects/food-vision-transformer',
    isWorking: true,
    category: 'research',
    secondaryCategory: 'ml',
  },
];
