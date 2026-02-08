'use client';

import { projects } from '@/config/Projects';
import { PortfolioMode } from '@/stores/modeStore';
import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ProjectList } from '../projects/ProjectList';
import { ResearchProjectCard } from '../projects/ResearchProjectCard';
import { Button } from '../ui/button';

interface ProjectsProps {
  mode: PortfolioMode;
}

export default function Projects({ mode }: ProjectsProps) {
  // In research mode, show research-relevant projects first
  const getResearchProjects = (): Project[] => {
    const researchKeywords = ['ml', 'ai', 'research', 'llm', 'neural', 'model'];

    return [...projects]
      .sort((a, b) => {
        const aRelevant = researchKeywords.some(
          (kw) =>
            a.category?.toLowerCase().includes(kw) ||
            a.subcategory?.toLowerCase().includes(kw) ||
            a.description?.toLowerCase().includes(kw),
        );
        const bRelevant = researchKeywords.some(
          (kw) =>
            b.category?.toLowerCase().includes(kw) ||
            b.subcategory?.toLowerCase().includes(kw) ||
            b.description?.toLowerCase().includes(kw),
        );
        return (bRelevant ? 1 : 0) - (aRelevant ? 1 : 0);
      })
      .slice(0, 2);
  };

  const displayProjects =
    mode === 'research' ? getResearchProjects() : projects.slice(0, 2);

  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Featured" heading="Projects" />

      {mode === 'research' ? (
        // Research mode: compact, no images, research-focused
        <div className="mt-8 flex flex-col gap-4">
          {displayProjects.map((project) => (
            <ResearchProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        // Engineering mode: full project cards
        <ProjectList className="mt-8" projects={displayProjects} />
      )}

      <div className="mt-8 flex justify-center">
        <Button variant="outline">
          <Link href="/projects">Show all projects</Link>
        </Button>
      </div>
    </Container>
  );
}
