# Portfolio Dual-Lens Mode Design

Date: 2026-04-22  
Project: `V2.1`  
Status: Approved for planning

## Objective

Improve the Engineering/Research mode system so mode switching feels instant, content differences are clearer, and each lens serves a distinct audience without fragmenting the site into two separate products.

## Chosen Direction

Use a **Lens-First Instant Switch** model:

- Keep one shared homepage route and visual system.
- Make mode differences obvious in the first viewport through hero messaging and CTA intent.
- Preserve instant switching behavior (no hard page reset).
- Keep and share mode via both URL query (`?mode=`) and persisted preference.

## Scope

### In scope

1. Stronger mode differentiation through:
   - Mode-specific hero subheadline copy
   - Mode-specific primary CTA intent
   - Mode-specific section ordering/emphasis
2. Instant mode switching UX:
   - No auto-scroll-to-top
   - Visible but lightweight context feedback chip
3. Deterministic mode resolution and synchronization:
   - URL + persisted mode + fallback default
4. Accessibility and reduced-motion behavior for toggle and transitions.

### Out of scope

- Creating two completely separate homepage layouts.
- Mode-specific navigation architecture split.
- Full redesign of existing section components.

## Experience Principles

1. **One identity, two lenses**: visitors should perceive one coherent personal brand with two valid views.
2. **Instant and non-disruptive**: switching mode should not break reading flow or scroll context.
3. **Above-the-fold differentiation**: users should understand the active lens immediately from hero and CTA.
4. **Sharable state**: links should preserve lens context for referrals.

## Mode Resolution Model

At runtime, initial mode is resolved by strict priority:

1. URL query `?mode=` when valid (`engineering | research`)
2. Persisted preference from client storage
3. Default fallback: `engineering`

Invalid mode values normalize to `engineering` and are corrected in URL sync behavior.

## Information Architecture and Content Behavior

### Engineering lens

- Hero copy emphasizes system delivery, product execution, and applied AI infrastructure.
- Primary CTA points to hiring/product execution intent (e.g., `View Projects` or `Hire Me`).
- Section priority:
  - `Hero -> Experience -> Work -> Models (compact) -> Papers (minimal) -> ...`

### Research lens

- Hero copy emphasizes methods, experimentation, and scientific rigor.
- Primary CTA points to research/collaboration intent (e.g., `View Research` or `Read Papers`).
- Section priority:
  - `Hero -> Experience -> Models (expanded) -> Papers (highlighted) -> Work -> ...`

## Interaction Design

### Toggle

- Keep current compact icon-first control.
- Improve clarity by adding active text label (`Engineering` / `Research`) near the toggle.
- Maintain keyboard and screen-reader support.

### Switching behavior

- Update content instantly.
- Preserve current scroll position.
- Show ephemeral context chip for ~2-3s:
  - `Viewing: Engineering lens` or `Viewing: Research lens`
- Keep helper hint discoverability behavior lightweight and non-blocking.

## State and Data Architecture

### Store responsibilities

`modeStore` remains the canonical mode state source:

- `mode`
- `setMode(mode)`
- `toggleMode()`

### Page responsibilities

`LandingPageClient`:

- Applies mode-specific section config + hero copy/CTA variants.
- Synchronizes URL query on mode change while preserving unrelated query params.
- Performs idempotent client sync with initial server-resolved mode.

### Config responsibilities

`sectionConfigs` + content config objects:

- Define per-mode ordering and prop-level emphasis.
- Reuse same section component primitives to avoid architecture duplication.

## Error Handling and Edge Cases

1. Invalid `?mode=` values do not crash rendering and fallback safely.
2. Missing/unavailable storage does not break mode behavior.
3. Hydration should not cause blank state or visual flicker.
4. Query preservation requirement:
   - `?mode=research&foo=bar` must keep `foo=bar` after mode updates.

## Accessibility and Motion

1. Toggle has correct ARIA semantics and state announcements.
2. Mode change announcement is available to assistive technologies.
3. Animations are subtle (roughly 150-250ms) to preserve instant feeling.
4. Respect `prefers-reduced-motion` by reducing or disabling non-essential transitions.

## Verification Plan

1. First load `/` renders Engineering lens with no blank/flicker.
2. First load `/?mode=research` renders Research lens on initial paint.
3. Toggle switch updates content instantly and preserves scroll.
4. URL mode value updates correctly and preserves extra query params.
5. Reload and revisit maintain expected lens behavior.
6. Back/forward browser navigation reflects mode state predictably.
7. Mobile and desktop interactions are consistent.
8. Keyboard + screen-reader checks pass for toggle behavior and announcements.

## Risks and Mitigations

1. **Risk: weak differentiation despite mode switch**  
   Mitigation: prioritize hero messaging and CTA differentiation first; validate first-screen impact.

2. **Risk: synchronization loops between URL and store**  
   Mitigation: idempotent updates and guard checks before state/query writes.

3. **Risk: motion feels heavy and contradicts instant switch intent**  
   Mitigation: cap transition duration and reduce animated scope to mode-dependent blocks.

## Implementation Notes for Planning Phase

- Prefer targeted changes to existing files over structural rewrites.
- Keep all existing branding/visual language intact.
- Treat this as an enhancement to current architecture, not a rebuild.
