import { getPublishedBlogPosts } from '@/lib/blog';

import LandingPageClient from './LandingPageClient';

export default function LandingPage() {
  const blogPosts = getPublishedBlogPosts();

  return <LandingPageClient blogPosts={blogPosts} />;
}
