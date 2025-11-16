import Crewai from '@/components/technologies/Crewai';
import Fastapi from '@/components/technologies/Fastapi';
import LangGraph from '@/components/technologies/LangGraph';
import MongoDB from '@/components/technologies/MongoDB';
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
];

export const about = {
  name: 'Mohit Goyal',
  description: `I'm 19, implementing LLM architectures from research (LLaMA, RoBERTa, BERT) and deploying production-grade GenAI agent systems with PyTorch, LangChain, and FastAPI on GCP.`,
};
