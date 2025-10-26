export interface Model {
  title: string;
  description: string;
  image: string;
  video?: string;
  link: string;
  technologies: { name: string; icon: React.ReactNode }[];
  github?: string;
  live: string;
  details: boolean;
  modelDetailsPageSlug: string;
  isWorking: boolean;
  category: 'language-models' | 'transformers' | 'translation' | 'storytelling' | 'moe' | 'compact' | 'educational';
  secondaryCategory?:
    | 'nlp'
    | 'computer-vision'
    | 'generative-ai'
    | 'research'
    | 'production';
  tags: string[];
  paper?: string;
  dataset?: string;
  metrics?: {
    name: string;
    value: string;
    description?: string;
  }[];
}

export interface ModelCaseStudyFrontmatter {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  timeline: string;
  role: string;
  team?: string;
  status: 'completed' | 'in-progress' | 'archived';
  featured: boolean;
  challenges?: string[];
  learnings?: string[];
  isPublished: boolean;
  category: 'language-models' | 'transformers' | 'translation' | 'storytelling' | 'moe' | 'compact' | 'educational';
  secondaryCategory?:
    | 'nlp'
    | 'computer-vision'
    | 'generative-ai'
    | 'research'
    | 'production';
  tags: string[];
  paper?: string;
  dataset?: string;
  metrics?: {
    name: string;
    value: string;
    description?: string;
  }[];
}

export interface ModelCaseStudy {
  slug: string;
  frontmatter: ModelCaseStudyFrontmatter;
  content: string;
}

export interface ModelCaseStudyPreview {
  slug: string;
  frontmatter: ModelCaseStudyFrontmatter;
}
