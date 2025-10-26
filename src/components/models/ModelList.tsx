import { type Model } from '@/types/model';
import React from 'react';

import { ModelCard } from './ModelCard';

interface ModelListProps {
  models: Model[];
  className?: string;
}

export function ModelList({ models, className }: ModelListProps) {
  if (models.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No models found.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 ${className}`}
    >
      {models.map((model: Model) => (
        <ModelCard key={model.title} model={model} />
      ))}
    </div>
  );
}
