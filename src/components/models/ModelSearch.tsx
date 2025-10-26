'use client';

import { Input } from '@/components/ui/input';
import { type Model } from '@/types/model';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface ModelSearchProps {
  models: Model[];
  onSearchResults: (filteredModels: Model[]) => void;
}

export function ModelSearch({ models, onSearchResults }: ModelSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      onSearchResults(models);
      return;
    }

    const filtered = models.filter((model) =>
      model.title.toLowerCase().includes(query.toLowerCase()) ||
      model.description.toLowerCase().includes(query.toLowerCase()) ||
      model.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      model.technologies.some(tech => tech.name.toLowerCase().includes(query.toLowerCase()))
    );

    onSearchResults(filtered);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search models (e.g., Mixtral, Transformer, PyTorch...)"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
