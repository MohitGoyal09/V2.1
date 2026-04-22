'use client';

import Container from '@/components/common/Container';
import { sectionConfigs } from '@/config/sections';
import { PortfolioMode, useModeStore } from '@/stores/modeStore';
import { BlogPostPreview } from '@/types/blog';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface LandingPageClientProps {
  blogPosts: BlogPostPreview[];
  initialMode: PortfolioMode;
}

export default function LandingPageClient({
  blogPosts,
  initialMode,
}: LandingPageClientProps) {
  const { mode, setMode } = useModeStore();
  const router = useRouter();

  // Sync mode from URL on initial load without suspending SSR.
  useEffect(() => {
    if (mode !== initialMode) {
      setMode(initialMode);
    }
  }, [initialMode, mode, setMode]);

  // Update URL when mode changes while preserving other query params.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get('mode') === mode) {
      return;
    }

    params.set('mode', mode);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [mode, router]);

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
