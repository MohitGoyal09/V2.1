'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Model } from '@/types/model';
import { useState } from 'react';

export type ModelCategory =
  | 'all'
  | 'language-models'
  | 'transformers'
  | 'translation'
  | 'storytelling'
  | 'moe'
  | 'compact'
  | 'educational';

interface ModelFilterProps {
  models: Model[];
  onFilterChange: (filteredModels: Model[]) => void;
}

const categoryLabels: Record<ModelCategory, string> = {
  all: 'All Models',
  'language-models': 'Language Models',
  'transformers': 'Transformers',
  'translation': 'Translation',
  'storytelling': 'Storytelling',
  'moe': 'MoE',
  'compact': 'Compact',
  'educational': 'Educational',
};

const categoryDescriptions: Record<ModelCategory, string> = {
  all: 'Show all research models and implementations',
  'language-models': 'Large language models and text generation',
  'transformers': 'Transformer-based architectures and implementations',
  'translation': 'Neural machine translation and language models',
  'storytelling': 'Creative AI and narrative generation models',
  'moe': 'Mixture of Experts architectures and implementations',
  'compact': 'Efficient and lightweight model implementations',
  'educational': 'Educational models and research frameworks',
};

export function ModelFilter({
  models,
  onFilterChange,
}: ModelFilterProps) {
  const [activeCategory, setActiveCategory] = useState<ModelCategory>('all');

  const getModelCount = (category: ModelCategory): number => {
    if (category === 'all') return models.length;
    return models.filter(
      (model) =>
        model.category === category || model.secondaryCategory === category,
    ).length;
  };

  const handleCategoryChange = (category: ModelCategory) => {
    setActiveCategory(category);

    const filteredModels =
      category === 'all'
        ? models
        : models.filter(
            (model) =>
              model.category === category ||
              model.secondaryCategory === category,
          );

    onFilterChange(filteredModels);
  };

  const categories: ModelCategory[] = [
    'all',
    'language-models',
    'transformers',
    'translation',
    'storytelling',
    'moe',
    'compact',
    'educational',
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const count = getModelCount(category);
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
