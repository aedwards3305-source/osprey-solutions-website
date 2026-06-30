# Osprey Cinematic Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline, visual checkpoints) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This is a visual frontend build: the "test" each task ends with is a dev-server render + Playwright screenshot reviewed for the described result, then a commit.

**Goal:** Turn the Osprey Solutions marketing site into a cinematic, graphic-rich showpiece that proves the agency builds gorgeous sites.

**Architecture:** Build a reusable FX/motion foundation (`src/components/fx/`), mount a global cinematic shell in `layout.tsx`, then upgrade each home section and sub-page to use those primitives. Real content is preserved verbatim. Use the `frontend-design` skill while implementing each visual component.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, lucide-react, @calcom/embed-react.

## Global Constraints

- Preserve real content verbatim: 6 portfolio projects (names/URLs/outcomes/case studies, screenshots in `public/`), 6 services, comparison table, 5-step 72-hour process, 10 testimonials, email `antonio@ospreysolutionsllc.com`, Cal.com booking.
- Palette: evolve, don't replace — brand emerald `#0B5D3B`/glow `#14A868`, gold `#D4AF37`, near-black `#070A0B` (from `tailwind.config.ts`).
- Every animated section MUST render its content as a visible fallback (no blank sections) and honor `prefers-reduced-motion: reduce`.
- Pointer-only effects (tilt, spotlight, magnetic) no-op on touch.
- 60fps target; lazy-mount heavy effects; no layout shift.
- Dev server runs on http://localhost:3002 (ports 3000/3001 in use). Verify there.
- Commit after every task. Pushing to `origin` auto-deploys Vercel production — do NOT push until the user approves.

---

## File Structure

**Create (foundation):**
- `src/components/fx/AuroraBackground.tsx` — fixed animated gradient-mesh + grain backdrop
- `src/components/fx/Overlays.tsx` — `GrainOverlay`, `DotGrid`
- `src/components/fx/ScrollProgress.tsx` — top scroll progress bar
- `src/components/fx/Spotlight.tsx` — pointer-following radial glow
- `src/components/fx/Reveal.tsx` — `Reveal` + `Stagger` entrance primitives (visible fallback)
- `src/components/fx/MagneticButton.tsx`
- `src/components/fx/TiltCard.tsx`
- `src/components/fx/CountUp.tsx`
- `src/components/fx/DeviceFrame.tsx` — `BrowserFrame`, `PhoneFrame`
- `src/components/fx/WordRotator.tsx`
- `src/components/fx/Marquee.tsx`
- `src/components/fx/useReducedMotion.ts` — shared reduced-motion + pointer hooks
- `src/components/fx/index.ts` — barrel export
- `src/components/BrandMark.tsx` — animated Osprey feather/wing SVG

**Modify:**
- `tailwind.config.ts` — display font family, aurora/float/draw/marquee keyframes
- `src/app/globals.css` — display font import, fx utility classes
- `src/app/layout.tsx` — mount global shell (Aurora, Grain, ScrollProgress, Spotlight)
- `src/components/Hero.tsx`, `Services.tsx`, `Portfolio.tsx`, `Comparison.tsx`, `Process.tsx`, `Testimonials.tsx`, `Contact.tsx`, `Header.tsx`, `Footer.tsx`, `StatsCounter.tsx`
- `src/app/book/page.tsx`, `src/app/estimate/page.tsx`, `src/app/faq/page.tsx`, `src/app/showcase/page.tsx`

---

## Task 1: Design tokens + reduced-motion/pointer hooks

**Files:** Modify `tailwind.config.ts`, `src/app/globals.css`; Create `src/components/fx/useReducedMotion.ts`

**Produces:** `usePrefersReducedMotion(): boolean`, `useIsPointerFine(): boolean`; Tailwind keyframes `aurora-drift`, `float`, `draw`, animations `aurora`, `float-slow`; display font family `font-display`.

- [ ] Add display typeface (Satoshi via Fontshare `@import`, fallback to Inter) in `globals.css`; add `fontFamily.display` in tailwind config.
- [ ] Add keyframes/animations: `aurora-drift` (slow translate/scale of mesh), `float` (subtle y bob), `draw` (stroke-dashoffset 0).
- [ ] Implement `usePrefersReducedMotion` (matchMedia, SSR-safe default false) and `useIsPointerFine` (matchMedia `(pointer: fine)`).
- [ ] **Verify:** `npm run build` compiles; dev server still renders home. Screenshot unchanged baseline.
- [ ] **Commit:** `feat: add design tokens, display font, motion hooks`

## Task 2: Background FX — Aurora, Overlays, ScrollProgress, Spotlight

**Files:** Create `AuroraBackground.tsx`, `Overlays.tsx`, `ScrollProgress.tsx`, `Spotlight.tsx`, `fx/index.ts`

**Consumes:** hooks from Task 1.
**Produces:** `<AuroraBackground/>`, `<GrainOverlay/>`, `<DotGrid/>`, `<ScrollProgress/>`, `<Spotlight/>` (all client components, fixed/absolute, `pointer-events-none`, `z` behind content).

- [ ] `AuroraBackground`: 2-3 large blurred radial gradient blobs (emerald/gold) on near-black, animated with `aurora` animation; static when reduced-motion.
- [ ] `Overlays`: SVG/data-URI grain + dot-grid, very low opacity.
- [ ] `ScrollProgress`: `useScroll` → scaleX bar fixed top, emerald→gold gradient.
- [ ] `Spotlight`: radial glow following pointer via rAF; render nothing when `!useIsPointerFine()` or reduced-motion.
- [ ] Barrel-export all fx from `index.ts`.
- [ ] **Verify:** temporarily mount in `layout.tsx`; screenshot shows aurora/grain behind existing content, progress bar on scroll, no console errors.
- [ ] **Commit:** `feat: add aurora, overlays, scroll progress, spotlight`

## Task 3: Mount global cinematic shell

**Files:** Modify `src/app/layout.tsx`

**Consumes:** Task 2 components.

- [ ] Render `AuroraBackground`, `GrainOverlay`, `DotGrid` as fixed background; `ScrollProgress`, `Spotlight` above; `{children}` in a `relative z-10` wrapper. Keep `bg-brand-black`.
- [ ] **Verify:** every route (`/`, `/book`, `/estimate`, `/faq`, `/showcase`) shows the shell; content readable; screenshot home + one sub-page.
- [ ] **Commit:** `feat: mount global cinematic background shell`

## Task 4: Motion primitives — Reveal, Stagger, MagneticButton, TiltCard, CountUp

**Files:** Create `Reveal.tsx`, `MagneticButton.tsx`, `TiltCard.tsx`, `CountUp.tsx`; update `fx/index.ts`

**Consumes:** hooks from Task 1.
**Produces:**
- `Reveal({children, delay?, y?, as?})` — animates from hidden→visible on view ONCE; under reduced-motion or no-JS, content is visible (no opacity-0 trap).
- `Stagger({children, gap?})` — orchestrates child reveals.
- `MagneticButton({children, href?, className?, ...})` — eases toward cursor (pointer-fine only).
- `TiltCard({children, className?, max?})` — rotateX/Y on hover (pointer-fine only).
- `CountUp({to, suffix?, decimals?, duration?})` — counts on view.

- [ ] Implement each; **critical:** `Reveal` must guarantee visibility fallback (fixes blank-section defect — animate `whileInView` from a baseline that is visible, or set initial visible when reduced-motion).
- [ ] **Verify:** drop a `Reveal`+`CountUp`+`TiltCard` demo into Services temporarily; screenshot shows content visible and animating; toggle emulated reduced-motion → still visible.
- [ ] **Commit:** `feat: add reveal, stagger, magnetic, tilt, countup primitives`

## Task 5: DeviceFrame, WordRotator, Marquee, BrandMark

**Files:** Create `DeviceFrame.tsx`, `WordRotator.tsx`, `Marquee.tsx`, `BrandMark.tsx`; update `fx/index.ts`

**Produces:**
- `BrowserFrame({url, children, className?})` / `PhoneFrame({children})` — chrome wrappers.
- `WordRotator({words, className?})` — cycles words (reduced-motion → first word static).
- `Marquee({children, speed?, reverse?})` — infinite scroller, pauses on hover, static-ish under reduced-motion.
- `BrandMark({className?})` — animated osprey feather/wing SVG (stroke-draw on view).

- [ ] Implement each.
- [ ] **Verify:** temporary showcase of all four; screenshot.
- [ ] **Commit:** `feat: add device frames, word rotator, marquee, brand mark`

## Task 6: Hero upgrade

**Files:** Modify `src/components/Hero.tsx`

**Consumes:** Aurora context (already global), `WordRotator`, `Marquee`, `Reveal`, `MagneticButton`.

- [ ] Keep `HeroBeforeAfter` slider unchanged. Replace static decorative blobs with reliance on global aurora; add `WordRotator` into headline ("websites · apps · AI systems"); wrap CTAs in `MagneticButton`; add floating parallax stat chips (reduced-motion safe); add tech-stack `Marquee` strip below slider.
- [ ] **Verify:** screenshot hero desktop + mobile; slider still draggable; rotator cycles; no blank.
- [ ] **Commit:** `feat: cinematic hero with word rotator, magnetic CTAs, marquee`

## Task 7: Stats band

**Files:** Modify `src/components/StatsCounter.tsx`; add to `src/app/page.tsx` between Hero and Services if not already composed.

**Consumes:** `CountUp`, `Reveal`.

- [ ] Animated metrics band: projects shipped, avg result lift, days-to-launch, on-time %. Use real/known figures (e.g. "98% on-time", "<72h launch") — no invented client counts beyond what's defensible; label generically where unknown.
- [ ] **Verify:** screenshot; numbers count up on scroll into view.
- [ ] **Commit:** `feat: animated stats band`

## Task 8: Services bento grid

**Files:** Modify `src/components/Services.tsx`

**Consumes:** `TiltCard`, `Reveal`, `Stagger`.

- [ ] Convert the 6 service cards to a bento-style grid of `TiltCard`s with gradient borders, animated icon on hover, glow. Preserve all titles/descriptions/details.
- [ ] **Verify:** screenshot; cards visible (fallback works), tilt on hover, content intact.
- [ ] **Commit:** `feat: bento services grid with tilt cards`

## Task 9: Portfolio showpiece

**Files:** Modify `src/components/Portfolio.tsx`

**Consumes:** `BrowserFrame`/`PhoneFrame`, `TiltCard`, `Reveal`, `Stagger`.

- [ ] Wrap each project screenshot in `DeviceFrame` (phone frame for SafeSpace/mobile-first ones, browser for the rest), add `TiltCard` 3D hover + hover zoom on the screenshot. Add filter tabs (All / Websites / Apps / E-Commerce) filtering by `project.type`. Preserve case-study expand logic, outcomes, tech tags, real URLs.
- [ ] **Verify:** screenshot grid; tabs filter; expand works; links intact.
- [ ] **Commit:** `feat: portfolio device-frame showpiece with filters`

## Task 10: Comparison animated table

**Files:** Modify `src/components/Comparison.tsx`

**Consumes:** `Reveal`.

- [ ] Animate check/partial/x icons drawing in on scroll (stagger by row); Osprey column glows and lifts. Preserve all rows/values.
- [ ] **Verify:** screenshot; checks animate; table data unchanged.
- [ ] **Commit:** `feat: animated comparison table`

## Task 11: Process timeline polish

**Files:** Modify `src/components/Process.tsx`

**Consumes:** existing `useScroll` line, `Reveal`.

- [ ] Add glowing numbered nodes (1–5) on the timeline and a brighter connecting beam; keep scroll-drawn line. Preserve steps/deliverables.
- [ ] **Verify:** screenshot; line draws on scroll; nodes glow.
- [ ] **Commit:** `feat: polished process timeline`

## Task 12: Testimonials enhancement

**Files:** Modify `src/components/Testimonials.tsx`

**Consumes:** `Marquee`, `Reveal`.

- [ ] Keep spotlight carousel; add a subtle scrolling `Marquee` "wall" of the 10 names/businesses behind the active card. Preserve quotes/results/auto-rotate.
- [ ] **Verify:** screenshot; carousel rotates; wall scrolls; reduced-motion safe.
- [ ] **Commit:** `feat: enhanced testimonials with name wall`

## Task 13: Contact/CTA cinematic close

**Files:** Modify `src/components/Contact.tsx`

**Consumes:** `MagneticButton`, `Reveal`.

- [ ] Intensify aurora near section, keep glass form + validation + `/api/lead` submit; make submit a `MagneticButton`; animate "what happens next" list with `Stagger`. Preserve email + Cal.com link.
- [ ] **Verify:** screenshot; form validates and submits (mock); email intact.
- [ ] **Commit:** `feat: cinematic contact section`

## Task 14: Header + Footer + BrandMark

**Files:** Modify `src/components/Header.tsx`, `src/components/Footer.tsx`

**Consumes:** `BrandMark`, `MagneticButton`.

- [ ] Header: glass-on-scroll, `BrandMark` logo, magnetic "Request a Quote". Footer: `BrandMark`, refined layout, preserve links/email.
- [ ] **Verify:** screenshot top + bottom; nav links work; scroll state changes.
- [ ] **Commit:** `feat: branded header and footer`

## Task 15: Sub-pages — book, estimate, faq, showcase

**Files:** Modify `src/app/book/page.tsx`, `estimate/page.tsx`, `faq/page.tsx`, `showcase/page.tsx`

**Consumes:** global shell, `Reveal`, shared header pattern.

- [ ] Apply consistent section headers + `Reveal` reveals; ensure each inherits the cinematic shell and matches the home look. Preserve Cal.com embed, cost estimator logic, FAQ accordion, showcase content.
- [ ] **Verify:** screenshot each of the 4 pages; existing behavior intact.
- [ ] **Commit:** `feat: apply cinematic system to sub-pages`

## Task 16: Full-site verification pass

**Files:** none (review)

- [ ] Scroll every page top-to-bottom: zero blank sections. Toggle reduced-motion (Playwright emulate) — all content visible, no auto-motion. Mobile width pass. Keyboard-tab interactive elements. Lighthouse perf/a11y spot-check. Confirm real content (names, URLs, outcomes, `antonio@ospreysolutionsllc.com`) unchanged via grep.
- [ ] Fix any regressions inline.
- [ ] **Commit:** `chore: full-site verification fixes` (if any)
- [ ] Report to user; await approval before pushing to deploy.
