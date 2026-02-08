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
      setMode: (mode) =>
        set(() => ({
          mode:
            mode === 'engineering' || mode === 'research'
              ? mode
              : 'engineering',
        })),
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
