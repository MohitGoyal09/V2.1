Implement an Engineering ↔ Research mode toggle in my existing portfolio.

The site already contains all sections and content.
Do not redesign the site or change visual style unless required for the toggle.

Requirements

Add a subtle toggle labeled:

Engineering (default)

Research

The toggle must:

Change section order, content emphasis, and copy

Reuse the same components (no duplication)

Not create new routes or pages

Persist state (localStorage or URL param)

Animate reordering smoothly

Section Components (already exist)
Hero
Experience
Work
Models
Papers
About
Github
Blog
CTA

ENGINEERING MODE (default)

Section order

Hero
Work
Experience
Models
Papers
About
Github
Blog
CTA


Behavior

Work = primary focus

Models = compact

Papers = minimal

Experience emphasizes system building

Hero copy = engineering / production focused

RESEARCH MODE

Section order

Hero
Papers
Models
Work
Experience
About
Github
Blog
CTA


Behavior

Papers = highlighted (but minimal)

Models = expanded with insights

Work = filtered to research-relevant projects

Experience emphasizes research contributions

Hero copy = research-focused (no tooling language)

Implementation Constraints

Introduce a global mode: "engineering" | "research"

Use config-driven section ordering (no JSX duplication)

Pass mode as a prop to sections to adjust copy and emphasis

Keep animations subtle

Toggle should feel like switching a lens, not navigating pages

Do NOT

Create /research routes

Duplicate components

Add modals or explanations

Over-style the toggle

Change existing content beyond emphasis/copy switches

Deliverable

Implement the toggle, refactor section rendering to be mode-aware, and ensure the site clearly presents:

Engineering mode → systems & shipping

Research mode → models & papers