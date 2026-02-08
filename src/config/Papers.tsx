import { Paper } from '@/types/paper';

export const papers: Paper[] = [
  {
    id: 'grit',
    title: 'GRIT: Geometric Reprojection Instruction Tuning',
    authors: ['Mohit Goyal', 'et al.'],
    venue: 'arXiv preprint',
    year: 2026,
    abstract:
      'We propose GRIT, a parameter-efficient instruction tuning framework that explores geometry-aware updates for large language models.',
    arxivId: '2601.00231',
    arxivUrl: 'https://arxiv.org/abs/2601.00231',
    pdfUrl: 'https://arxiv.org/pdf/2601.00231',
    tags: ['LLM', 'Fine-tuning', 'Parameter-Efficient', 'Instruction Tuning'],
    featured: true,
    metrics: [
      { label: 'Focus', value: 'Instruction Tuning' },
      { label: 'Approach', value: 'Geometry-Aware Updates' },
    ],
  },
];

export const getFeaturedPapers = () => papers.filter((p) => p.featured);
