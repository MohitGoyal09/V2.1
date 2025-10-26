'use client';

import Container from '@/components/common/Container';
import { ModelFilter } from '@/components/models/ModelFilter';
import { ModelList } from '@/components/models/ModelList';
import { ModelSearch } from '@/components/models/ModelSearch';
import { Separator } from '@/components/ui/separator';
import { models } from '@/config/Models';
import { type Model } from '@/types/model';
import { useState } from 'react';

export default function ModelsPage() {
  const [filteredModels, setFilteredModels] = useState<Model[]>(models);
  const [searchResults, setSearchResults] = useState<Model[]>(models);

  return (
    <Container className="py-16">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Research Models
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            My research implementations and model architectures across different domains of AI and machine learning.
          </p>
        </div>

        <Separator />

        {/* Search */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Search Models</h2>
          </div>

          <ModelSearch
            models={models}
            onSearchResults={setSearchResults}
          />
        </div>

        <Separator />

        {/* Filter */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Filter by tags:</h2>
          </div>

          <ModelFilter
            models={searchResults}
            onFilterChange={setFilteredModels}
          />
        </div>

        <Separator />

        {/* Models */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Showing all {filteredModels.length} models
            </h2>
          </div>

          <ModelList models={filteredModels} />
        </div>
      </div>
    </Container>
  );
}
