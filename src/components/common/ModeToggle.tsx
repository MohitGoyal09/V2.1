'use client';

import EngineeringIcon from '@/components/svgs/Engineering';
import ResearchIcon from '@/components/svgs/Research';
import { PortfolioMode, useModeStore } from '@/stores/modeStore';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

export default function ModeToggle() {
  const { mode, setMode } = useModeStore();
  const [showHelper, setShowHelper] = useState(false);

  // Show helper on first visit
  useEffect(() => {
    const hasSeenHelper = localStorage.getItem('mode-toggle-helper');
    if (!hasSeenHelper) {
      setShowHelper(true);
      localStorage.setItem('mode-toggle-helper', 'true');
      // Hide after 4 seconds
      setTimeout(() => setShowHelper(false), 4000);
    }
  }, []);

  const modes: { id: PortfolioMode; icon: React.ReactNode; label: string }[] = [
    { id: 'engineering', icon: <EngineeringIcon />, label: 'Engineering' },
    { id: 'research', icon: <ResearchIcon />, label: 'Research' },
  ];

  return (
    <div className="relative">
      <div className="flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/50 p-1">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            aria-pressed={mode === m.id}
            aria-label={m.label}
            className={`relative rounded-full p-2 transition-colors ${
              mode === m.id
                ? 'text-white'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {mode === m.id && (
              <motion.div
                layoutId="mode-indicator"
                className="absolute inset-0 rounded-full bg-neutral-800"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center">
              {m.icon}
            </span>
          </button>
        ))}
      </div>

      {/* Helper tooltip */}
      {showHelper && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 whitespace-nowrap rounded-md bg-neutral-800 px-3 py-1.5 text-xs text-neutral-300 shadow-lg"
        >
          Switch lens: Engineering ↔ Research
        </motion.div>
      )}
    </div>
  );
}
