'use client';

import Container from '@/components/common/Container';
import { ProjectFilter } from '@/components/projects/ProjectFilter';
import { ProjectList } from '@/components/projects/ProjectList';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/config/Projects';
import { type Project } from '@/types/project';
import { useState } from 'react';

export default function ProjectsPage() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  return (
    <Container className="py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Projects
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            My projects and work across different technologies and domains.
          </p>
        </div>

        <Separator />

        {/* Filter */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Filter Projects</h2>
          </div>

          <ProjectFilter
            projects={projects}
            onFilterChange={setFilteredProjects}
          />
        </div>

        <Separator />

        {/* Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {filteredProjects.length === projects.length
                ? 'All Projects'
                : 'Filtered Projects'}
              {filteredProjects.length > 0 && (
                <span className="ml-2 text-sm font-normal text-muted-foreground">
                  ({filteredProjects.length}{' '}
                  {filteredProjects.length === 1 ? 'project' : 'projects'})
                </span>
              )}
            </h2>
          </div>

          <ProjectList projects={filteredProjects} />
        </div>
      </div>
    </Container>
  );
}
