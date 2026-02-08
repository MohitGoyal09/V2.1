'use client';

import { papers } from '@/config/Papers';
import { PortfolioMode } from '@/stores/modeStore';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

interface PapersProps {
  mode: PortfolioMode;
  minimal?: boolean;
  highlighted?: boolean;
}

export default function Papers({ mode, minimal, highlighted }: PapersProps) {
  const featuredPapers = papers.filter((p) => p.featured);

  return (
    <Container className="mx-auto max-w-5xl">
      <SectionHeading
        subHeading={mode === 'engineering' ? 'Publications' : 'Research'}
        heading={mode === 'engineering' ? 'Papers' : 'Selected Papers'}
      />

      <div className={`mt-8 ${highlighted ? 'space-y-8' : 'space-y-4'}`}>
        {featuredPapers.map((paper) => (
          <div
            key={paper.id}
            className={`rounded-lg border p-6 transition-all ${
              highlighted
                ? 'border-blue-500/30 bg-blue-500/5'
                : 'border-neutral-800'
            }`}
          >
            {/* Title & Venue */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-xl font-bold">{paper.title}</h3>
              <span className="text-sm text-neutral-500">
                {paper.venue} • {paper.year}
              </span>
            </div>

            {/* Authors */}
            <p className="mt-2 text-sm text-neutral-400">
              {paper.authors.join(', ')}
            </p>

            {/* Abstract - Show in research mode or if highlighted */}
            {(mode === 'research' || highlighted) &&
              !minimal &&
              paper.abstract && (
                <p className="mt-4 text-neutral-300">{paper.abstract}</p>
              )}

            {/* Metrics - Research mode only */}
            {mode === 'research' && paper.metrics && (
              <div className="mt-4 flex flex-wrap gap-4">
                {paper.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-md bg-neutral-800 px-3 py-2"
                  >
                    <p className="text-xs text-neutral-500">{metric.label}</p>
                    <p className="font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="mt-4 flex gap-4">
              <Link
                href={paper.arxivUrl}
                target="_blank"
                className="text-sm text-blue-400 hover:underline"
              >
                arXiv
              </Link>
              {paper.pdfUrl && (
                <Link
                  href={paper.pdfUrl}
                  target="_blank"
                  className="text-sm text-blue-400 hover:underline"
                >
                  PDF
                </Link>
              )}
              {paper.codeUrl && (
                <Link
                  href={paper.codeUrl}
                  target="_blank"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Code
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Link - Research mode */}
      {mode === 'research' && (
        <div className="mt-6 text-center">
          <Link
            href="/papers"
            className="text-neutral-400 transition-colors hover:text-white"
          >
            View all papers →
          </Link>
        </div>
      )}
    </Container>
  );
}
