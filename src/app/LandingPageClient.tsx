'use client';

import Container from '@/components/common/Container';
import { sectionConfigs } from '@/config/sections';
import { PortfolioMode, useModeStore } from '@/stores/modeStore';
import { BlogPostPreview } from '@/types/blog';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface LandingPageClientProps {
  blogPosts: BlogPostPreview[];
}

export default function LandingPageClient({
  blogPosts,
}: LandingPageClientProps) {
  const { mode, setMode } = useModeStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sync URL with mode on initial load
  useEffect(() => {
    const urlMode = searchParams.get('mode') as PortfolioMode | null;
    if (urlMode && ['engineering', 'research'].includes(urlMode)) {
      setMode(urlMode);
    }
  }, [searchParams, setMode]);

  // Update URL when mode changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('mode', mode);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [mode, router, searchParams]);

  const currentSections = sectionConfigs[mode];

  return (
    <Container className="min-h-screen py-16">
      <div className="space-y-16">
        {currentSections.map((section) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const SectionComponent = section.component as any;
          const sectionProps =
            section.id === 'blog'
              ? { ...section.props, posts: blogPosts }
              : section.props;
          return (
            <motion.div
              key={`${mode}-${section.id}`}
              layout
              transition={{
                layout: { duration: 0.4, ease: 'easeInOut' },
              }}
            >
              <SectionComponent mode={mode} {...sectionProps} />
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
}
