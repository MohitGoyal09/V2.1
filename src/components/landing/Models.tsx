'use client';

import { models } from '@/config/Models';
import { PortfolioMode } from '@/stores/modeStore';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ModelList } from '../models/ModelList';
import { Button } from '../ui/button';

interface ModelsProps {
  mode: PortfolioMode;
  compact?: boolean;
  expanded?: boolean;
}

export default function Models({ mode, compact, expanded }: ModelsProps) {
  // Show 2 models in compact mode, all in expanded
  const displayModels = compact
    ? models.slice(0, 2)
    : expanded
      ? models
      : models.slice(0, 2);

  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Research" heading="Models" />

      <ModelList className="mt-8" models={displayModels} />

      {mode === 'research' && (
        <div className="mt-8 rounded-lg border border-neutral-800/50 bg-neutral-900/20 p-6">
          <p className="text-neutral-300 italic">
            My research focuses on understanding how parameter-efficient updates
            and geometric constraints affect learning dynamics in large language
            models.
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button variant="outline">
          <Link href="/models">Show all models</Link>
        </Button>
      </div>
    </Container>
  );
}
