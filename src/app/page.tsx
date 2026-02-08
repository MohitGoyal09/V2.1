import { getPublishedBlogPosts } from '@/lib/blog';

import LandingPageClient from './LandingPageClient';

import { Suspense } from 'react';

export default function LandingPage() {
  const blogPosts = getPublishedBlogPosts();

  return (
    <Suspense>
      <LandingPageClient blogPosts={blogPosts} />
    </Suspense>
  );
}
