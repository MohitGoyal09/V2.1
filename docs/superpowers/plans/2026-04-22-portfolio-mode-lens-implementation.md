# Portfolio Mode Lens Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver an instant, clearly differentiated Engineering/Research lens experience with mode-specific hero messaging/CTA, deterministic URL+persisted mode behavior, and accessible switch feedback.

**Architecture:** Keep one homepage route and shared section components, but make mode a first-class UI lens. Mode drives hero content + section emphasis, while URL (`?mode`) remains shareable and persisted mode remains sticky for return visits.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Zustand persist, Framer Motion, Tailwind CSS

---

## File Structure and Responsibilities

- Modify: `src/config/Hero.tsx`
  - Source of mode-specific hero copy + CTA variants.
- Modify: `src/components/landing/Hero.tsx`
  - Render mode-specific hero description and mode-specific buttons.
- Modify: `src/components/common/ModeToggle.tsx`
  - Active text label, aria-live announcement, and ephemeral mode chip.
- Modify: `src/app/LandingPageClient.tsx`
  - URL synchronization hardening, reduced-motion transition tuning, and query preservation.
- Modify: `src/app/page.tsx`
  - Safe mode parsing from `searchParams` and server-driven initial mode.
- Create: `src/lib/mode.ts`
  - Shared mode parsing and URL param helpers to keep logic consistent.
- Create: `src/lib/mode.spec.md`
  - Lightweight executable-manual test matrix for mode parsing/query behavior (project has no test runner).

---

### Task 1: Centralize mode parsing and query helpers

**Files:**
- Create: `src/lib/mode.ts`
- Test: `src/lib/mode.spec.md`

- [ ] **Step 1: Write failing behavior cases in spec file**

```md
# mode utility checks

## parseMode
- input: "engineering" => "engineering"
- input: "research" => "research"
- input: "invalid" => fallback "engineering"
- input: undefined => fallback "engineering"

## mergeModeIntoQuery
- preserves unrelated params (?foo=1)
- updates mode key only
```

- [ ] **Step 2: Verify current code does not satisfy centralized utility requirement**

Run: `rg "getInitialMode|params.set\('mode'" src/app src/components src/lib`
Expected: mode parsing/update logic appears inline in multiple files.

- [ ] **Step 3: Implement minimal utility module**

```ts
// src/lib/mode.ts
import { PortfolioMode } from '@/stores/modeStore';

const VALID_MODES: PortfolioMode[] = ['engineering', 'research'];

export function parseMode(value: string | null | undefined): PortfolioMode {
  return VALID_MODES.includes(value as PortfolioMode)
    ? (value as PortfolioMode)
    : 'engineering';
}

export function mergeModeIntoQuery(
  search: string,
  mode: PortfolioMode,
): string {
  const params = new URLSearchParams(search);
  params.set('mode', mode);
  return `?${params.toString()}`;
}
```

- [ ] **Step 4: Validate utility compiles and imports resolve**

Run: `npm run lint -- src/lib/mode.ts`
Expected: no lint errors for new utility.

- [ ] **Step 5: Commit**

```bash
git add src/lib/mode.ts src/lib/mode.spec.md
git commit -m "refactor: centralize portfolio mode parsing helpers"
```

---

### Task 2: Make initial mode resolution deterministic across server + client

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/LandingPageClient.tsx`
- Modify: `src/stores/modeStore.ts`
- Test: `src/lib/mode.spec.md`

- [ ] **Step 1: Add failing checks to spec matrix for precedence**

```md
## precedence
1) URL mode (valid) wins
2) persisted mode used when URL missing
3) default engineering otherwise
```

- [ ] **Step 2: Confirm current client-sync behavior can override URL unexpectedly**

Run: `rg "initialMode|setMode\(|persist\(" src/app src/stores`
Expected: state hydration + initial sync are in separate places without explicit precedence guard.

- [ ] **Step 3: Implement precedence-safe synchronization**

```ts
// src/app/page.tsx
import { parseMode } from '@/lib/mode';
const initialMode = parseMode(searchParams?.mode);

// src/app/LandingPageClient.tsx
import { mergeModeIntoQuery } from '@/lib/mode';

useEffect(() => {
  if (mode !== initialMode) setMode(initialMode);
}, [initialMode, mode, setMode]);

useEffect(() => {
  const next = mergeModeIntoQuery(window.location.search, mode);
  if (next !== `${window.location.search || '?'}`) {
    router.replace(next, { scroll: false });
  }
}, [mode, router]);
```

- [ ] **Step 4: Validate key runtime paths manually**

Run: `npm run dev`
Expected:
- `/` loads engineering
- `/?mode=research` loads research on first paint
- query params besides `mode` are preserved.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/LandingPageClient.tsx src/stores/modeStore.ts src/lib/mode.spec.md
git commit -m "fix: enforce deterministic mode precedence and URL sync"
```

---

### Task 3: Strengthen hero differentiation by mode (copy + CTA)

**Files:**
- Modify: `src/config/Hero.tsx`
- Modify: `src/components/landing/Hero.tsx`
- Test: `src/lib/mode.spec.md`

- [ ] **Step 1: Write expected mode-specific hero outcomes in spec matrix**

```md
## hero behavior
- engineering: execution-focused line + engineering CTA
- research: methodology-focused line + research CTA
```

- [ ] **Step 2: Verify current component still uses shared button config**

Run: `rg "buttons|heroModeConfig" src/config/Hero.tsx src/components/landing/Hero.tsx`
Expected: shared button config is global and not mode-specific.

- [ ] **Step 3: Implement mode-specific hero config and rendering**

```ts
// src/config/Hero.tsx
export const heroModeConfig = {
  engineering: {
    description: { template: '...' },
    buttons: [
      { variant: 'outline', text: 'Resume / CV', href: '/resume', icon: 'CV' },
      { variant: 'default', text: 'View Projects', href: '/projects', icon: 'Chat' },
    ],
  },
  research: {
    description: { template: '...' },
    buttons: [
      { variant: 'outline', text: 'Resume / CV', href: '/resume', icon: 'CV' },
      { variant: 'default', text: 'Read Papers', href: '/models', icon: 'Chat' },
    ],
  },
};

// src/components/landing/Hero.tsx
const modeConfig = heroModeConfig[mode];
const description = modeConfig.description;
const buttons = modeConfig.buttons;
```

- [ ] **Step 4: Verify hero differences in both modes**

Run: `npm run dev`
Expected: switching modes changes hero copy and primary CTA immediately.

- [ ] **Step 5: Commit**

```bash
git add src/config/Hero.tsx src/components/landing/Hero.tsx src/lib/mode.spec.md
git commit -m "feat: add mode-specific hero messaging and ctas"
```

---

### Task 4: Improve ModeToggle UX feedback and accessibility

**Files:**
- Modify: `src/components/common/ModeToggle.tsx`
- Test: `src/lib/mode.spec.md`

- [ ] **Step 1: Define expected accessibility outcomes in spec matrix**

```md
## accessibility
- active mode is readable without icon-only reliance
- switch announces mode change via aria-live
- helper chip auto-dismisses and does not block interaction
```

- [ ] **Step 2: Verify current toggle lacks explicit active text and live region**

Run: `rg "aria-live|aria-label|showHelper|label" src/components/common/ModeToggle.tsx`
Expected: no aria-live region for mode-change announcement and no visible active text label.

- [ ] **Step 3: Implement active text label + live announcement + ephemeral chip**

```tsx
const [announcement, setAnnouncement] = useState('');

useEffect(() => {
  setAnnouncement(`Viewing: ${mode === 'engineering' ? 'Engineering' : 'Research'} lens`);
}, [mode]);

<p className="text-xs text-neutral-400" aria-hidden>
  {mode === 'engineering' ? 'Engineering' : 'Research'}
</p>

<span className="sr-only" aria-live="polite">{announcement}</span>
```

- [ ] **Step 4: Verify keyboard and screen-reader flow manually**

Run: `npm run dev`
Expected:
- toggle remains keyboard-clickable
- active text updates
- context chip appears ~2-3s and fades
- no layout shift.

- [ ] **Step 5: Commit**

```bash
git add src/components/common/ModeToggle.tsx src/lib/mode.spec.md
git commit -m "feat: improve mode toggle clarity and accessibility feedback"
```

---

### Task 5: Tune transitions for instant feel + reduced motion

**Files:**
- Modify: `src/app/LandingPageClient.tsx`
- Test: `src/lib/mode.spec.md`

- [ ] **Step 1: Add expected motion constraints to spec matrix**

```md
## motion
- transition durations remain subtle (150-250ms target)
- reduced-motion users avoid heavy layout transitions
```

- [ ] **Step 2: Verify current transition duration is heavier than target**

Run: `rg "duration|layout" src/app/LandingPageClient.tsx`
Expected: layout transition currently ~0.4s spring/ease.

- [ ] **Step 3: Implement reduced-motion aware transition tuning**

```tsx
import { motion, useReducedMotion } from 'framer-motion';

const prefersReducedMotion = useReducedMotion();
const layoutTransition = prefersReducedMotion
  ? { duration: 0 }
  : { duration: 0.2, ease: 'easeOut' };

<motion.div layout transition={{ layout: layoutTransition }}>
```

- [ ] **Step 4: Validate switching feel and no visual jank**

Run: `npm run dev`
Expected: mode switch feels immediate, with mild or no animation depending on user preference.

- [ ] **Step 5: Commit**

```bash
git add src/app/LandingPageClient.tsx src/lib/mode.spec.md
git commit -m "perf: tune mode-switch transitions for instant behavior"
```

---

## Final Verification and Handoff Task

**Files:**
- Modify: `docs/superpowers/specs/2026-04-22-portfolio-mode-lens-design.md` (only if any implementation variance discovered)
- Test: project runtime + lint

- [ ] **Step 1: Run lint**

Run: `npm run lint`
Expected: no new lint failures in changed files (existing unrelated warnings can be documented).

- [ ] **Step 2: Run production build smoke check**

Run: `npm run build`
Expected: build succeeds and homepage route compiles.

- [ ] **Step 3: Manual scenario verification**

Run through:
- `/`
- `/?mode=research`
- `/?mode=engineering&foo=bar`
- keyboard toggle flow
- refresh + back/forward behavior

Expected: all spec verification points pass.

- [ ] **Step 4: Update spec if implementation diverged**

Document only intentional divergence with rationale.

- [ ] **Step 5: Commit verification/docs update**

```bash
git add docs/superpowers/specs/2026-04-22-portfolio-mode-lens-design.md
git commit -m "docs: reconcile lens-mode spec with implementation"
```

---

## Self-Review Checklist (completed)

- Spec coverage: all approved sections mapped to tasks (hero differentiation, instant switching, URL+persist behavior, accessibility, reduced motion).
- Placeholder scan: no TBD/TODO placeholders left in plan steps.
- Type/signature consistency: `PortfolioMode`, `parseMode`, and `mergeModeIntoQuery` signatures are used consistently.
