'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Project } from '@/types/project';
import { useState } from 'react';

export type ProjectCategory =
  | 'all'
  | 'full-stack'
  | 'frontend'
  | 'backend'
  | 'ml'
  | 'research'
  | 'ai';

interface ProjectFilterProps {
  projects: Project[];
  onFilterChange: (filteredProjects: Project[]) => void;
}

const categoryLabels: Record<ProjectCategory, string> = {
  all: 'All Projects',
  'full-stack': 'Full Stack',
  frontend: 'Frontend',
  backend: 'Backend',
  ml: 'Machine Learning',
  research: 'Research',
  ai: 'AI',
};

const categoryDescriptions: Record<ProjectCategory, string> = {
  all: 'Show all projects',
  'full-stack': 'Complete applications with frontend and backend',
  frontend: 'User interface and client-side applications',
  backend: 'Server-side applications and APIs',
  ml: 'Machine learning models and applications',
  research: 'Research implementations and academic projects',
  ai: 'AI-powered applications and intelligent systems',
};

export function ProjectFilter({
  projects,
  onFilterChange,
}: ProjectFilterProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const getProjectCount = (category: ProjectCategory): number => {
    if (category === 'all') return projects.length;
    return projects.filter(
      (project) =>
        project.category === category || project.secondaryCategory === category,
    ).length;
  };

  const handleCategoryChange = (category: ProjectCategory) => {
    setActiveCategory(category);

    const filteredProjects =
      category === 'all'
        ? projects
        : projects.filter(
            (project) =>
              project.category === category ||
              project.secondaryCategory === category,
          );

    onFilterChange(filteredProjects);
  };

  const categories: ProjectCategory[] = [
    'all',
    'full-stack',
    'frontend',
    'backend',
    'ml',
    'research',
    'ai',
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const count = getProjectCount(category);
          const isActive = activeCategory === category;

          return (
            <Button
              key={category}
              variant={isActive ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="relative"
            >
              {categoryLabels[category]}
              {count > 0 && (
                <Badge
                  variant={isActive ? 'secondary' : 'outline'}
                  className="ml-2 text-xs"
                >
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      <div className="text-sm text-muted-foreground">
        {categoryDescriptions[activeCategory]}
      </div>
    </div>
  );
}
