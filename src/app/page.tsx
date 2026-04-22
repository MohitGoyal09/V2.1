import { getPublishedBlogPosts } from '@/lib/blog';
import { PortfolioMode } from '@/stores/modeStore';

import LandingPageClient from './LandingPageClient';

interface LandingPageProps {
  searchParams?: {
    mode?: string;
  };
}

const getInitialMode = (mode?: string): PortfolioMode =>
  mode === 'research' ? 'research' : 'engineering';

export default function LandingPage({ searchParams }: LandingPageProps) {
  const blogPosts = getPublishedBlogPosts();
  const initialMode = getInitialMode(searchParams?.mode);

  return <LandingPageClient blogPosts={blogPosts} initialMode={initialMode} />;
}
