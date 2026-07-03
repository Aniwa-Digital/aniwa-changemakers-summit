# Aniwa Summit — Convergence

Cinematic one-page marketing site for the Aniwa Summit (October 23–25, 2026):
a private, by-invitation gathering where Indigenous wisdom keepers meet
frontier-technology builders. A nonprofit initiative of Aniwa & the Huya Aniwa
Foundation.

Built from the v1.0 design handoff in `../design_handoff_aniwa_summit_v1/`
(see [docs/PLAN.md](docs/PLAN.md) for the implementation plan and locked
decisions).

## Stack

- Vite 6 · React 19 · TypeScript · Tailwind v4 (design tokens as CSS custom properties)
- three.js 0.160 (starfield/beam scene + fire orb, lazy-loaded)
- Raw WebGL2 hero shader (rainbow-arc compass reveal)
- Vitest for the pure logic (choreography math, roster pools, ring placement)

## Commands

```bash
npm install
npm run dev       # http://localhost:5180
npm run build     # type-check + production build to dist/
npm test          # unit tests
```

## Architecture notes

- One `requestAnimationFrame` loop ([src/lib/scroll-choreography.ts](src/lib/scroll-choreography.ts))
  drives all scroll choreography from live `getBoundingClientRect()` reads —
  prophecy act crossfades, compass spins, weave strand drawing, the §03→§07
  connector stroke, and the Room's height matching. The hero shader alone uses
  `window.scrollY` (deliberate: upright compass at page top).
- The compass artwork's visual center sits at **57% of its height** — every
  centering/rotation uses `transform-origin: 50% 57%` and negative-margin
  centering (scroll rotation overwrites `transform` each frame).
- WebGL layers over photos render **opaque** and composite with
  `mix-blend-mode: screen` on a wrapper element so black drops out.
- All decorative motion is gated behind `prefers-reduced-motion`.
- Page content is static in [src/lib/content.ts](src/lib/content.ts); the only
  state is UI state (modals, invite code, live roster slots).
