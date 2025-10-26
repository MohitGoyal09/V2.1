'use client';

import { type Experience, experiences } from '@/config/Experience';
import { Link } from 'next-view-transitions';
import React, { useState } from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ExperienceCard } from '../experience/ExperienceCard';
import { Button } from '../ui/button';

export default function Experience() {
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(
    new Set([experiences[0]?.company]) // Only the first (most recent) experience is expanded by default
  );

  const toggleExperience = (company: string) => {
    setExpandedExperiences(prev => {
      const newSet = new Set(prev);
      if (newSet.has(company)) {
        newSet.delete(company);
      } else {
        newSet.add(company);
      }
      return newSet;
    });
  };

  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Featured" heading="Experience" />
      <div className="mt-4 flex flex-col gap-8">
        {experiences.map((experience: Experience, index: number) => {
          const isExpanded = expandedExperiences.has(experience.company);
          const isFirst = index === 0;
          
          return (
            <ExperienceCard 
              key={experience.company} 
              experience={experience}
              isCollapsed={!isExpanded}
              onToggle={isFirst ? undefined : () => toggleExperience(experience.company)}
            />
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <Button variant="outline">
          <Link href="/work-experience">Show all work experiences</Link>
        </Button>
      </div>
    </Container>
  );
}
