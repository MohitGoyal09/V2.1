'use client';

import { models } from '@/config/Models';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { ModelList } from '../models/ModelList';
import { Button } from '../ui/button';

export default function Models() {
  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Research" heading="Models" />

      <ModelList className="mt-8" models={models.slice(0, 2)} />
      <div className="mt-8 flex justify-center">
        <Button variant="outline">
          <Link href="/models">Show all models</Link>
        </Button>
      </div>
    </Container>
  );
}
