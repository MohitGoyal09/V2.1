export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract?: string;
  arxivId: string;
  arxivUrl: string;
  pdfUrl?: string;
  codeUrl?: string;
  tags: string[];
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
}
