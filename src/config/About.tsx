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
  <MongoDB key="mongodb" />,
  <NextJs key="nextjs" />,
  <NodeJs key="nodejs" />,
  <PostgreSQL key="postgresql" />,
  <Pytorch key="pytorch" />,
  <Crewai key="crewai" />,
  <LangGraph key="langgraph" />,
  <Fastapi key="fastapi" />,
];

export const about = {
  name: 'Mohit Goyal',
  description: `I'm a Full Stack Developer and AI/ML Engineer who loves turning ideas into impactful products. I specialize in building intelligent web applications that combine cutting-edge AI with robust full-stack architecture.`,
};
