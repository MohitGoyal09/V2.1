'use client';

import { type Experience, experiences } from '@/config/Experience';
import { PortfolioMode } from '@/stores/modeStore';
import { Link } from 'next-view-transitions';
import React, { useEffect, useState } from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ExperienceCard } from '../experience/ExperienceCard';
import { Button } from '../ui/button';

interface ExperienceProps {
  mode: PortfolioMode;
}

export default function Experience({ mode }: ExperienceProps) {
  // In Research mode, collapse all experiences by default
  // In Engineering mode, expand only the first one
  const [expandedExperiences, setExpandedExperiences] = useState<Set<string>>(
    new Set(),
  );

  // Initialize expanded state based on mode
  useEffect(() => {
    if (mode === 'engineering') {
      setExpandedExperiences(new Set([experiences[0]?.company]));
    } else {
      // Research mode: collapse all by default
      setExpandedExperiences(new Set());
    }
  }, [mode]);

  const toggleExperience = (company: string) => {
    setExpandedExperiences((prev) => {
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
        {experiences.map((experience: Experience) => {
          const isExpanded = expandedExperiences.has(experience.company);

          return (
            <ExperienceCard
              key={experience.company}
              experience={experience}
              isCollapsed={!isExpanded}
              onToggle={() => toggleExperience(experience.company)}
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
