import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X';
import Crewai from '@/components/technologies/Crewai';
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
};

export const heroConfig = {
  // Personal Information
  name: 'Mohit ',
  title: 'ML Engineer & Full Stack Developer',
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
      name: 'Bun',
      href: 'https://bun.sh/',
      component: 'Bun',
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
      '🔥 Building intelligent web applications with {skills:0} {skills:1} {skills:2} — powered by {skills:7} {skills:9} & {skills:8} 🧠 Specializing in ML model deployment and full-stack AI products.',
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
