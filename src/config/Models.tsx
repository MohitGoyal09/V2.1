import Pytorch from '@/components/technologies/Pytorch';
import { Model } from '@/types/model';

export const models: Model[] = [
  {
    title: 'LLaMA Implementation',
    description:
      'A PyTorch implementation of the LLaMA (Large Language Model Meta AI) architecture based on the paper "LLaMA: Open and Efficient Foundation Language Models" by Touvron et al.',
    image: '/models/llama.png',
    video: '',
    link: 'https://github.com/MohitGoyal09/llama-implementation',
    technologies: [
      { name: 'PyTorch', icon: <Pytorch key="pytorch" /> },
    ],
    github: 'https://github.com/MohitGoyal09/llama-implementation',
    live: 'https://github.com/MohitGoyal09/llama-implementation',
    details: true,
    modelDetailsPageSlug: '/models/llama',
    isWorking: true,
    category: 'language-models',
    secondaryCategory: 'research',
    tags: ['Language Models', 'Transformers', 'Research', 'PyTorch'],
    paper: 'https://arxiv.org/abs/2302.13971',
    dataset: 'https://huggingface.co/datasets/tiny_shakespeare',
    metrics: [
      { name: 'Parameters', value: '100M', description: 'Total model parameters for large configuration' },
      { name: 'Training Speed', value: '2.5x', description: 'Speed improvement with mixed precision' },
      { name: 'Memory Efficiency', value: '40%', description: 'Memory reduction with optimizations' },
    ],
  },
];
