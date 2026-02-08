import Docker from '@/components/technologies/Docker';
import Fastapi from '@/components/technologies/Fastapi';
import LangGraph from '@/components/technologies/LangGraph';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Pytorch from '@/components/technologies/Pytorch';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';

export const mySkills = [
  <ReactIcon key="react" />,
  <TypeScript key="typescript" />,
  <NextJs key="nextjs" />,
  <NodeJs key="nodejs" />,
  <PostgreSQL key="postgresql" />,
  <Pytorch key="pytorch" />,
  <LangGraph key="langgraph" />,
  <Fastapi key="fastapi" />,
  <Docker key="docker" />,
];

export const about = {
  name: 'Mohit Goyal',
  description: `ML Engineer focused on designing and deploying production-ready AI systems. I work across the stack from implementing LLM architectures from scratch to building with PyTorch, LangChain, FastAPI, and Next.js.`,
};
