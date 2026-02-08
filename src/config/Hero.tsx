import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X';
import Crewai from '@/components/technologies/Crewai';
import Docker from '@/components/technologies/Docker';
import Fastapi from '@/components/technologies/Fastapi';
import LangGraph from '@/components/technologies/LangGraph';
import Langchain from '@/components/technologies/Langchain';
import NextJs from '@/components/technologies/NextJs';
import Pytorch from '@/components/technologies/Pytorch';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

// Component mapping for skills
export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NextJs: NextJs,

  Pytorch: Pytorch,
  Langchain: Langchain,
  Crewai: Crewai,
  LangGraph: LangGraph,
  Fastapi: Fastapi,
  Docker: Docker,
};

export const heroConfig = {
  // Personal Information
  name: 'Mohit ',
  title: 'ML Engineer & Full Stack AI Developer',
  avatar: '/assets/logo.png',

  // Skills Configuration
  skills: [
    {
      name: 'Typescript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
    {
      name: 'Docker',
      href: 'https://www.docker.com/',
      component: 'Docker',
    },
    {
      name: 'PostgreSQL',
      href: 'https://www.postgresql.org/',
      component: 'PostgreSQL',
    },
    {
      name: 'Pytorch',
      href: 'https://pytorch.org/',
      component: 'Pytorch',
    },
    {
      name: 'Langchain',
      href: 'https://langchain.com/',
      component: 'Langchain',
    },
    {
      name: 'Crewai',
      href: 'https://crewai.org/',
      component: 'Crewai',
    },
    {
      name: 'LangGraph',
      href: 'https://langgraph.dev/',
      component: 'LangGraph',
    },
    {
      name: 'Fastapi',
      href: 'https://fastapi.tiangolo.com/',
      component: 'Fastapi',
    },
  ],

  // Description Configuration
  description: {
    template:
      'Building production-grade AI systems with {skills:5}, {skills:6}, and {skills:2}. I implement models from scratch and deploy end-to-end systems focused on <b>LLM agents</b>, <b>RAG pipelines</b>, and <b>scalable AI infrastructure</b>.',
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'X',
    href: 'http://x.com/ByteMohit',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohit-goyal09',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/MohitGoyal09',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:mohitgoyal09042006@gmail.com',
    icon: <Mail />,
  },
];
