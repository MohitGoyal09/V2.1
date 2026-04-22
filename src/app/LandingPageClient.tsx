'use client';

import Container from '@/components/common/Container';
import { mergeModeIntoQuery } from '@/lib/mode';
import { sectionConfigs } from '@/config/sections';
import { PortfolioMode, useModeStore } from '@/stores/modeStore';
import { BlogPostPreview } from '@/types/blog';
import { motion, useReducedMotion } from 'framer-motion';
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
  const prefersReducedMotion = useReducedMotion();

  // Sync mode from URL on initial load without suspending SSR.
  useEffect(() => {
    if (mode !== initialMode) {
      setMode(initialMode);
    }
  }, [initialMode, mode, setMode]);

  // Update URL when mode changes while preserving other query params.
  useEffect(() => {
    const currentSearch = window.location.search;
    const params = new URLSearchParams(currentSearch);

    if (params.get('mode') === mode) {
      return;
    }

    const nextSearch = mergeModeIntoQuery(currentSearch, mode);
    router.replace(nextSearch, { scroll: false });
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
                layout: prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 0.2, ease: 'easeOut' },
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
