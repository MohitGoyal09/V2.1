# Portfolio Implementation Plan: Papers Section + Engineering ↔ Research Mode Toggle

## Overview

Adding a Papers section for research publications and implementing an Engineering/Research mode toggle that changes section order, content emphasis, and copy while maintaining the existing visual design.

---

## Implementation Steps (In Order)

### Step 1: Install Dependencies

```bash
pnpm install zustand
```

---

### Step 2: Create Zustand Store for Mode Management

**File:** `src/stores/modeStore.ts`

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PortfolioMode = 'engineering' | 'research';

interface ModeState {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  toggleMode: () => void;
}

export const useModeStore = create<ModeState>()(
  persist(
    (set) => ({
      mode: 'engineering',
      setMode: (mode) => set({ mode }),
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === 'engineering' ? 'research' : 'engineering',
        })),
    }),
    {
      name: 'portfolio-mode',
    },
  ),
);
```

---

### Step 3: Create Paper Types

**File:** `src/types/paper.ts`

```typescript
export interface Paper {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract: string;
  arxivId: string;
  arxivUrl: string;
  pdfUrl?: string;
  codeUrl?: string;
  tags: string[];
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
}
```

---

### Step 4: Create Papers Config

**File:** `src/config/Papers.tsx`

```typescript
import { Paper } from '@/types/paper';

export const papers: Paper[] = [
  {
    id: 'grit',
    title: 'GRIT: Geometric Reprojection Instruction Tuning',
    authors: ['Mohit Goyal', 'et al.'],
    venue: 'arXiv preprint',
    year: 2025,
    abstract:
      'We introduce GRIT (Geometric Reprojection Instruction Tuning), a novel parameter-efficient fine-tuning framework that updates only 0.997% of LLM parameters while outperforming full fine-tuning and LoRA on standard benchmarks. GRIT uses geometry-aware updates to achieve superior performance with significant compute savings.',
    arxivId: '2601.00231',
    arxivUrl: 'https://arxiv.org/abs/2601.00231',
    pdfUrl: 'https://arxiv.org/pdf/2601.00231',
    tags: ['LLM', 'Fine-tuning', 'Parameter-Efficient', 'Instruction Tuning'],
    featured: true,
    metrics: [
      { label: 'Parameters Tuned', value: '0.997%' },
      { label: 'Compute Reduction', value: '40%' },
      { label: 'Models', value: 'GPT-2, LLaMA, Mistral' },
    ],
  },
];

export const getFeaturedPapers = () => papers.filter((p) => p.featured);
```

---

### Step 5: Create Papers Section Component

**File:** `src/components/landing/Papers.tsx`

```typescript
'use client';

import { papers } from '@/config/Papers';
import { PortfolioMode } from '@/stores/modeStore';
import { Link } from 'next-view-transitions';
import React from 'react';

import SectionHeading from '../common/SectionHeading';
import Container from '../common/Container';

interface PapersProps {
  mode: PortfolioMode;
  minimal?: boolean;
  highlighted?: boolean;
}

export default function Papers({ mode, minimal, highlighted }: PapersProps) {
  const featuredPapers = papers.filter((p) => p.featured);

  return (
    <Container className="mx-auto max-w-5xl">
      <SectionHeading
        subHeading={mode === 'engineering' ? 'Publications' : 'Research'}
        heading={mode === 'engineering' ? 'Papers' : 'Selected Papers'}
      />

      <div className={`mt-8 ${highlighted ? 'space-y-8' : 'space-y-4'}`}>
        {featuredPapers.map((paper) => (
          <div
            key={paper.id}
            className={`rounded-lg border p-6 transition-all ${
              highlighted
                ? 'border-blue-500/30 bg-blue-500/5'
                : 'border-neutral-800'
            }`}
          >
            {/* Title & Venue */}
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-xl font-bold">{paper.title}</h3>
              <span className="text-sm text-neutral-500">
                {paper.venue} • {paper.year}
              </span>
            </div>

            {/* Authors */}
            <p className="mt-2 text-sm text-neutral-400">
              {paper.authors.join(', ')}
            </p>

            {/* Abstract - Show in research mode or if highlighted */}
            {(mode === 'research' || highlighted) && !minimal && (
              <p className="mt-4 text-neutral-300">{paper.abstract}</p>
            )}

            {/* Metrics - Research mode only */}
            {mode === 'research' && paper.metrics && (
              <div className="mt-4 flex flex-wrap gap-4">
                {paper.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-md bg-neutral-800 px-3 py-2"
                  >
                    <p className="text-xs text-neutral-500">{metric.label}</p>
                    <p className="font-semibold">{metric.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="mt-4 flex gap-4">
              <Link
                href={paper.arxivUrl}
                target="_blank"
                className="text-sm text-blue-400 hover:underline"
              >
                arXiv
              </Link>
              {paper.pdfUrl && (
                <Link
                  href={paper.pdfUrl}
                  target="_blank"
                  className="text-sm text-blue-400 hover:underline"
                >
                  PDF
                </Link>
              )}
              {paper.codeUrl && (
                <Link
                  href={paper.codeUrl}
                  target="_blank"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Code
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* View All Link - Research mode */}
      {mode === 'research' && (
        <div className="mt-6 text-center">
          <Link
            href="/papers"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            View all papers →
          </Link>
        </div>
      )}
    </Container>
  );
}
```

---

### Step 6: Create Mode Toggle Component

**File:** `src/components/common/ModeToggle.tsx`

```typescript
'use client';

import { useModeStore, PortfolioMode } from '@/stores/modeStore';
import { motion } from 'framer-motion';
import React from 'react';

export default function ModeToggle() {
  const { mode, setMode } = useModeStore();

  const modes: { id: PortfolioMode; label: string }[] = [
    { id: 'engineering', label: 'Engineering' },
    { id: 'research', label: 'Research' },
  ];

  return (
    <div className="flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/50 p-1">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === m.id ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          {mode === m.id && (
            <motion.div
              layoutId="mode-indicator"
              className="absolute inset-0 rounded-full bg-neutral-800"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{m.label}</span>
        </button>
      ))}
    </div>
  );
}
```

---

### Step 7: Update Hero Config with Mode-Specific Copy

**File:** `src/config/Hero.tsx`

Add mode-specific descriptions:

```typescript
// Add to existing heroConfig object:
export const heroModeConfig = {
  engineering: {
    description: {
      template:
        'Building production-grade AI systems with {skills:5}, {skills:6}, and {skills:2}. I implement models from scratch and deploy end-to-end systems focused on <b>LLM agents</b>, <b>RAG pipelines</b>, and <b>scalable AI infrastructure</b>.',
    },
  },
  research: {
    description: {
      template:
        'Developing novel architectures and training methodologies for large language models. My research focuses on <b>parameter-efficient fine-tuning</b>, <b>instruction tuning</b>, and <b>geometric optimization</b> techniques.',
    },
  },
};
```

---

### Step 8: Update Hero Component

**File:** `src/components/landing/Hero.tsx`

```typescript
import {
  heroConfig,
  heroModeConfig,
  skillComponents,
  socialLinks,
} from '@/config/Hero';
import { PortfolioMode } from '@/stores/modeStore';

// ... other imports

interface HeroProps {
  mode: PortfolioMode;
}

export default function Hero({ mode }: HeroProps) {
  const { name, title, avatar, skills, buttons } = heroConfig;
  const description = heroModeConfig[mode].description;

  // ... rest of component using mode-specific description
}
```

---

### Step 9: Update Experience Component

**File:** `src/components/landing/Experience.tsx`

Add optional mode prop (no content changes needed - bold text already handles emphasis):

```typescript
import { PortfolioMode } from '@/stores/modeStore';

interface ExperienceProps {
  mode: PortfolioMode;
}

export default function Experience({ mode }: ExperienceProps) {
  // Existing implementation - no changes needed
  // Bold text in config already emphasizes appropriately
}
```

---

### Step 10: Update Models Component

**File:** `src/components/landing/Models.tsx`

```typescript
import { PortfolioMode } from '@/stores/modeStore';

interface ModelsProps {
  mode: PortfolioMode;
  compact?: boolean;
  expanded?: boolean;
}

export default function Models({ mode, compact, expanded }: ModelsProps) {
  // Show 2 models in compact mode, all in expanded
  // Add insights section when expanded
}
```

---

### Step 11: Update Projects Component

**File:** `src/components/landing/Projects.tsx`

```typescript
import { PortfolioMode } from '@/stores/modeStore';

interface ProjectsProps {
  mode: PortfolioMode;
}

export default function Projects({ mode }: ProjectsProps) {
  // Show all projects in both modes
  // Optional: Reorder to show AI/ML projects first in research mode
}
```

---

### Step 12: Update About Component

**File:** `src/components/landing/About.tsx`

```typescript
import { PortfolioMode } from '@/stores/modeStore';

interface AboutProps {
  mode: PortfolioMode;
}

export default function About({ mode }: AboutProps) {
  // Existing implementation - no changes needed
}
```

---

### Step 13: Update Main Page

**File:** `src/app/page.tsx`

```typescript
'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useModeStore, PortfolioMode } from '@/stores/modeStore';

import Container from '@/components/common/Container';
import ModeToggle from '@/components/common/ModeToggle';
import Hero from '@/components/landing/Hero';
import Experience from '@/components/landing/Experience';
import Work from '@/components/landing/Projects';
import Models from '@/components/landing/Models';
import Papers from '@/components/landing/Papers';
import About from '@/components/landing/About';
import Github from '@/components/landing/Github';
import Blog from '@/components/landing/Blog';
import CTA from '@/components/landing/CTA';

export default function LandingPage() {
  const { mode, setMode } = useModeStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Sync URL with mode
  useEffect(() => {
    const urlMode = searchParams.get('mode') as PortfolioMode | null;
    if (urlMode && ['engineering', 'research'].includes(urlMode)) {
      setMode(urlMode);
    }
  }, [searchParams, setMode]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('mode', mode);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [mode, router, searchParams]);

  const sectionConfigs = {
    engineering: [
      { id: 'hero', component: Hero, props: {} },
      { id: 'experience', component: Experience, props: {} },
      { id: 'work', component: Work, props: {} },
      { id: 'models', component: Models, props: { compact: true } },
      { id: 'papers', component: Papers, props: { minimal: true } },
      { id: 'about', component: About, props: {} },
      { id: 'github', component: Github, props: {} },
      { id: 'blog', component: Blog, props: {} },
      { id: 'cta', component: CTA, props: {} },
    ],
    research: [
      { id: 'hero', component: Hero, props: {} },
      { id: 'experience', component: Experience, props: {} },
      { id: 'models', component: Models, props: { expanded: true } },
      { id: 'papers', component: Papers, props: { highlighted: true } },
      { id: 'work', component: Work, props: {} },
      { id: 'about', component: About, props: {} },
      { id: 'github', component: Github, props: {} },
      { id: 'blog', component: Blog, props: {} },
      { id: 'cta', component: CTA, props: {} },
    ],
  };

  const currentSections = sectionConfigs[mode];

  return (
    <Container className="min-h-screen py-16">
      <div className="mb-8 flex justify-end">
        <ModeToggle />
      </div>

      <AnimatePresence mode="popLayout">
        {currentSections.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <motion.div
              key={`${mode}-${section.id}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                layout: { duration: 0.4 },
              }}
            >
              <SectionComponent mode={mode} {...section.props} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </Container>
  );
}
```

---

### Step 14: Update Navbar to Include Mode Toggle

**File:** `src/components/common/Navbar.tsx`

Add ModeToggle component to the navbar, likely on the right side next to other navigation items or theme toggle.

---

### Step 15: Create Full Papers Page (Optional)

**File:** `src/app/papers/page.tsx`

Complete listing of all papers with filtering capabilities.

---

## Section Order Summary

### Engineering Mode (Default)

1. Hero
2. Experience
3. Work
4. Models (compact)
5. Papers (minimal)
6. About
7. Github
8. Blog
9. CTA

### Research Mode

Hero
Papers
Models
Work
Experience
About
Github
Blog
CTA


---

## Hero Copy

### Engineering Mode

> Building production-grade AI systems with PyTorch, LangChain, and Next.js. I implement models from scratch and deploy end-to-end systems focused on **LLM agents**, **RAG pipelines**, and **scalable AI infrastructure**.

### Research Mode

> Developing novel architectures and training methodologies for large language models. My research focuses on **parameter-efficient fine-tuning**, **instruction tuning**, and **geometric optimization** techniques.

---

## Animation Details

- **Section Reordering**: Framer Motion `layout` prop with `popLayout` mode
- **Duration**: 400ms for section moves
- **Stagger**: 50ms delay between sections
- **Easing**: Spring animation for natural feel
- **Toggle Indicator**: Sliding pill animation

---

## URL Persistence

- Mode stored in URL: `?mode=engineering` or `?mode=research`
- Updates on mode change (no page reload)
- Initial load checks URL parameter
- Falls back to localStorage, then defaults to 'engineering'

---

## Files Summary

**New Files (7):**

1. `src/stores/modeStore.ts` - Zustand store
2. `src/types/paper.ts` - Paper type definitions
3. `src/config/Papers.tsx` - Paper data
4. `src/components/landing/Papers.tsx` - Papers section
5. `src/components/common/ModeToggle.tsx` - Toggle UI
6. `src/app/papers/page.tsx` - Full papers page (optional)

**Modified Files (6):**

1. `src/config/Hero.tsx` - Add mode-specific copy
2. `src/components/landing/Hero.tsx` - Add mode prop
3. `src/components/landing/Experience.tsx` - Add mode prop
4. `src/components/landing/Models.tsx` - Add mode prop + conditional rendering
5. `src/components/landing/Projects.tsx` - Add mode prop
6. `src/components/landing/About.tsx` - Add mode prop
7. `src/app/page.tsx` - Full refactor with mode-aware rendering
8. `src/components/common/Navbar.tsx` - Integrate ModeToggle

---

## Next Steps

1. Review this plan
2. Approve hero copy for both modes
3. I'll implement all files in order
4. Test mode switching and animations
5. Deploy
