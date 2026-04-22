import { getPublishedBlogPosts } from '@/lib/blog';
import { parseMode } from '@/lib/mode';
import { PortfolioMode } from '@/stores/modeStore';

import LandingPageClient from './LandingPageClient';

interface LandingPageProps {
  searchParams?: Promise<{
    mode?: string;
  }>;
}

export default async function LandingPage({
  searchParams,
}: LandingPageProps) {
  const blogPosts = getPublishedBlogPosts();
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialMode: PortfolioMode = parseMode(resolvedSearchParams?.mode);

  return <LandingPageClient blogPosts={blogPosts} initialMode={initialMode} />;
}
