'use client';

import { type Project } from '@/types/project';
import { Link } from 'next-view-transitions';
import React from 'react';

import ArrowRight from '../svgs/ArrowRight';
import { Badge } from '../ui/badge';

interface ResearchProjectCardProps {
  project: Project;
}

export function ResearchProjectCard({ project }: ResearchProjectCardProps) {
  return (
    <div className="group relative rounded-lg border border-neutral-800 bg-neutral-900/30 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-800/50">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold group-hover:text-neutral-200">
          {project.title}
        </h3>
        <Link
          href={`/projects/${project.slug}`}
          className="flex items-center gap-1 text-sm text-neutral-500 transition-colors hover:text-neutral-300"
        >
          <span>View</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Description - single line */}
      <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
        {project.description}
      </p>

      {/* Research relevance tags */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.category && (
          <Badge variant="outline" className="text-xs">
            {project.category}
          </Badge>
        )}
        {project.subcategory && (
          <Badge variant="secondary" className="text-xs">
            {project.subcategory}
          </Badge>
        )}
        {/* Research relevance indicators */}
        {(project.category === 'ml' ||
          project.category === 'ai' ||
          project.category === 'research') && (
          <Badge variant="destructive" className="text-xs">
            Research Relevance
          </Badge>
        )}
      </div>

      {/* Minimal tech stack */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-neutral-500">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech.name}
              className="rounded bg-neutral-800/50 px-1.5 py-0.5"
            >
              {tech.name}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded bg-neutral-800/50 px-1.5 py-0.5">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
