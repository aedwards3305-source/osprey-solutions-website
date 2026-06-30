# Osprey Solutions — Cinematic Redesign Spec

**Date:** 2026-06-30
**Project:** osprey-solutions-website (Next.js 14 / App Router, TypeScript, Tailwind, Framer Motion)
**Goal:** Transform the agency's own marketing site into living proof that Osprey builds gorgeous, high-end sites — cinematic, graphic-rich, and dynamic — so prospects *want* to hire them.

## Direction

"A design studio clearly operating at a higher level than its clients' competitors." Keep the existing emerald-on-near-black + gold luxury palette and all real content; make every section **move, react, and demonstrate** rather than describe. Bold/maximal ceiling, full site, real content kept accurate, visuals generated in code/SVG (no stock).

## Non-Goals (YAGNI)

- No CMS/backend rework. Content stays as typed data in components.
- No palette overhaul — evolve, don't replace.
- No new copy beyond microcopy needed for new UI affordances.
- No analytics/marketing-tooling changes.

## Constraints

- Preserve real content verbatim: 6 portfolio projects (names, URLs, outcomes, case studies, screenshots in `public/`), 6 services, comparison table, 5-step 72-hour process, 10 testimonials, contact email `antonio@ospreysolutionsllc.com`, Cal.com booking.
- Accessibility & performance: full `prefers-reduced-motion` support, 60fps target, lazy-mount heavy effects, no layout shift, keyboard-operable interactive elements.
- **Fix existing defect:** section reveal animations (`whileInView` + `initial="hidden"`/opacity 0) can leave sections rendered blank when the IntersectionObserver doesn't fire. New `Reveal` primitive must guarantee content is visible as a fallback (animate from a visible baseline, or reveal-once with a safety timeout / no-JS visible default).

## Architecture

### Foundation layer (build once, reuse everywhere)

A new `src/components/fx/` directory of small, single-purpose, independently testable primitives:

- **`AuroraBackground`** — fixed, full-viewport animated emerald/gold gradient-mesh (CSS/SVG, GPU-friendly), drifting slowly. Composes with grain + dot-grid overlays. Disabled motion under reduced-motion (static gradient).
- **`GrainOverlay`** / **`DotGrid`** — lightweight texture overlays (SVG/data-URI), reuse existing `noise-bg` approach.
- **`ScrollProgress`** — top-of-page progress bar driven by `useScroll`.
- **`Spotlight`** — subtle pointer-following radial glow (pointer devices only; off for touch/reduced-motion).
- **`Reveal`** — fade/rise-on-view wrapper with reduced-motion + visible fallback (fixes blank-section defect). Single source of truth for entrance animation.
- **`Stagger`** — container that staggers child `Reveal`s.
- **`MagneticButton`** — button/link that eases toward the cursor on hover.
- **`TiltCard`** — 3D tilt-on-hover wrapper (pointer only).
- **`CountUp`** — animated number counter triggered on view.
- **`DeviceFrame`** — browser-chrome and phone-chrome wrappers around a screenshot/child; reused by Portfolio and Hero.
- **`WordRotator`** — cycles a list of words in the headline.
- **`Marquee`** — infinite horizontal scroller (generalize the existing `animate-marquee`).

Design tokens extended in `tailwind.config.ts` (keep brand colors; add display font family, extra keyframes for aurora/float/draw). A display typeface (e.g. Satoshi or Clash Display via self-host or Google alternative) added for headlines; Inter remains body.

### Page composition

`src/app/layout.tsx` mounts `AuroraBackground`, `GrainOverlay`, `ScrollProgress`, `Spotlight` globally so every route inherits the cinematic shell. A shared `PageShell`/section-header pattern keeps sub-pages consistent.

### Section upgrades (home — `src/app/page.tsx`)

1. **Hero** — keep the draggable before/after slider (centerpiece). Add aurora backdrop, `WordRotator` headline ("websites · apps · AI systems"), floating parallax stat chips, and a tech-stack `Marquee` strip.
2. **Stats band** (new or via existing `StatsCounter`) — `CountUp` metrics (projects shipped, avg. result lift, days-to-launch) on a graphic band.
3. **Services** — bento grid of `TiltCard`s with gradient borders, animated icons, hover glow.
4. **Portfolio** — showpiece: real screenshots in `DeviceFrame`s, `TiltCard` 3D hover, hover zoom-to-preview, filter tabs (All / Websites / Apps / E-com), case-study expand (preserve existing expand logic).
5. **Comparison** — animated table: checks draw in on scroll, Osprey column glows/lifts.
6. **Process** — keep scroll-drawn timeline; add glowing numbered nodes + connecting beam.
7. **Testimonials** — enhanced spotlight carousel + subtle scrolling name "wall" behind.
8. **Contact/CTA** — cinematic close: intensified aurora, glass form (preserve validation/submit), `MagneticButton` submit.

### Sub-pages

`book`, `estimate`, `faq`, `showcase` adopt the shared shell + `Reveal`/header patterns for consistency. Behavior (Cal.com embed, cost estimator, FAQ accordion, showcase grid) preserved; only presentation upgraded.

### Generated visuals

All in code/SVG: aurora/mesh, grain + dot-grid, `DeviceFrame` chrome, an animated Osprey feather/wing brand mark, animated service icons. No raster stock assets.

## Data Flow

No change. Content remains static TypeScript data co-located with components. FX primitives are presentational and take children/props only. Forms keep existing `/api/lead` and `/api/booking` endpoints.

## Error Handling & Resilience

- Every animated section renders meaningful content with JS disabled / observer not firing (visible fallback baseline).
- `prefers-reduced-motion: reduce` → static aurora, no parallax/tilt/spotlight/marquee auto-motion, instant reveals.
- Pointer-only effects (tilt, spotlight, magnetic) no-op on touch.
- Images keep `alt`; device frames are decorative wrappers.

## Testing / Verification

- Visual regression via Playwright screenshots (full page + key sections) at desktop + mobile widths, before/after.
- Manual: scroll through every section confirming no blank gaps; toggle reduced-motion; keyboard-tab interactive elements; Lighthouse performance/accessibility pass.
- Confirm real content (names, URLs, outcomes, email) unchanged.

## Rollout

Branch off `main`, build foundation layer first (testable in isolation), then home sections, then sub-pages. Pushing to the connected GitHub repo auto-deploys to the Vercel production project `osprey-solutions`.
