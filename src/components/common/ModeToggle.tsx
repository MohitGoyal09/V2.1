'use client';

import EngineeringIcon from '@/components/svgs/Engineering';
import { PortfolioMode, useModeStore } from '@/stores/modeStore';
import { motion } from 'framer-motion';
import { FlaskConical } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function ModeToggle({
  compact = false,
  className = '',
}: {
  compact?: boolean;
  className?: string;
}) {
  const { mode, setMode } = useModeStore();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const lensLabel = mode === 'engineering' ? 'Engineering' : 'Research';
    setAnnouncement(`Viewing: ${lensLabel} lens`);
  }, [mode]);

  const modes: { id: PortfolioMode; icon: React.ReactNode; label: string; shortLabel: string }[] = [
    { id: 'engineering', icon: <EngineeringIcon />, label: 'Engineering', shortLabel: 'Eng' },
    { id: 'research', icon: <FlaskConical className="h-4 w-4" />, label: 'Research', shortLabel: 'Res' },
  ];

  return (
    <div className={className}>
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>

      <div className={`inline-flex items-center rounded-full border border-neutral-800/80 bg-neutral-900/40 p-1 ${compact ? 'gap-1' : 'gap-1.5'}`}>
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            aria-pressed={mode === m.id}
            aria-label={m.label}
            className={`relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium tracking-wide transition-colors sm:text-sm ${
              mode === m.id ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {mode === m.id && (
              <motion.div
                layoutId="mode-indicator"
                className="absolute inset-0 rounded-full bg-neutral-800"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center">
              {m.icon}
            </span>
            <span className="relative z-10">{compact ? m.shortLabel : m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
