# Aniwa Summit — Implementation Plan (v1.0)

Source of truth: `../design_handoff_aniwa_summit_v1/` (README + `Aniwa Summit.dc.html` markup).
Where the README and markup disagree, **the markup wins** (confirmed with stakeholder 2026-07-03).

## Decisions (locked)

| Decision | Choice |
|---|---|
| Stack | Vite + React 19 + TypeScript, Tailwind v4 (tokens as CSS custom properties), three.js 0.160 |
| Section order | hero → prophecy → weaving → room → the-days → founders circle (#apply) → invitation → closing |
| Reciprocity accordion | **Excluded** (emptied from prototype markup; only #invitation content ships) |
| Partner logos | Extracted from `.image-slots.state.json` (base64 webp → real files), rendered as `<img>` |
| Location / deploy | `Aniwa Summit/aniwa-summit-app`, local only, fresh git repo |

## Architecture

```
src/
├── components/
│   ├── nav/SiteNav.tsx                  # fixed-feel bar: hamburger / logo / ATTENDEE LOGIN
│   ├── hero/Hero.tsx, CompassShader.tsx, HeroStrokeText.tsx, hero.css
│   ├── prophecy/Prophecy.tsx, CosmicScene.tsx, prophecy.css
│   ├── weaving/Weaving.tsx, weaving.css # 6 SVG strands + spinning compass + 8 nodes
│   ├── room/Room.tsx, room.css          # stats rail + logo grid + 12-slot live roster
│   ├── days/Days.tsx, days.css          # land header, 4 element boxes, 3 day cards, outcome, connector
│   ├── founders/FoundersCircle.tsx, NominationModal.tsx, LoginModal.tsx, founders.css
│   ├── invitation/Invitation.tsx, invitation.css  # 6 steps + invite-code card
│   ├── closing/Closing.tsx, FireSphere.tsx, closing.css
│   └── ui/GlowCard.tsx, Modal.tsx       # shared spotlight-border card; modal scrim/card shell
├── hooks/
│   ├── useReducedMotion.ts
│   ├── useReveal.ts                     # [data-reveal] IO + 3s failsafe, hide-by-class
│   └── useRosterSwap.ts                 # ~2.2s builder crossfade vs reserve pool
├── lib/
│   ├── scroll-choreography.ts           # single rAF loop (ported summit-scroll.js)
│   └── content.ts                       # roster pools, founders ring, steps, days, elements, logos
└── styles/tokens.css, typography.css, global.css
```

- **State** is local per feature (React useState): `nomOpen/sent`, `loginOpen/loginProvider`, `code/registered`, roster `slots`. No global store, no data fetching.
- **Scroll choreography** stays a single rAF loop reading `getBoundingClientRect()` each frame, exactly as the prototype (`cineProgression`, `compassParallax`, `spinWeaveCompass`, `spinApplyCompass`, `positionConnector`, `drawWeave`, `matchRoomHeights` → CSS-grid version). Started once from `App` via effect; respects `prefers-reduced-motion`.
- **three.js scenes** (`CosmicScene`, `FireSphere`) and the WebGL2 `CompassShader` are ported to ESM imports (no `window.THREE`) and **lazy-loaded** (`React.lazy`) so the initial bundle stays lean. Both three scenes render opaque and are composited with `mix-blend-mode: screen` on a wrapper div.

## Fidelity gotchas (from handoff, must-honor)

1. Compass artwork center sits at **57% of its height** — all centering/rotation uses `transform-origin: 50% 57%` and negative-margin centering (rotation overwrites `transform`, so never center with translate on the same element).
2. Hero shader rotation uses `window.scrollY` (not rect.top) so the compass is upright at page top; `t = iTime * 2.0`; compass height unit 0.972.
3. `overflow: clip` (never `hidden`) on ancestors of sticky sections.
4. §03 connector is measured from live rects **every frame**: top = outcome-box bottom; length = apply-compass top + 8 − outcome bottom; `#the-days` gets `z-index: 3` so the line paints over the bone section.
5. Weave compass completes exactly 2π when the strand draw finishes at 85% of the pin.
6. Roster keeper slots `[1, 3, 8, 10]` never swap (per prototype code); only builder slots crossfade (opacity 0.55s, interval 2.2s), disabled under reduced motion.
7. Prophecy beam appears only after the pin releases (`scrolled > pin + 0.25vh` per CosmicScene source), fades in over ~90px, eases out ~240px after the fly ends.
8. House radius 2px; motion `cubic-bezier(0.22,1,0.36,1)` ≈ 1.15s; sacred marks ✦ ◎ ▢ △ ▽, no emoji.
9. Reveal is hide-by-class with a 3s failsafe — content can never be stuck hidden.

## Design tokens

Port `_ds/.../tokens/*.css` verbatim into `src/styles/tokens.css` (oklch palette + semantic aliases + label-caps/display type scale), exposed to Tailwind v4 via `@theme` where useful. Fonts: Google Fonts (Cormorant Garamond + Inter), preloaded.

## Assets

- Copy `assets/` (img, people, compass, wordmark, logo) into `public/assets/`.
- Decode the 12 partner logos from `.image-slots.state.json` → `public/assets/logos/*.webp`. Big-six logos (Disney+, Netflix, PepsiCo, NatGeo, Block, Stanford) render at 68px height, the rest 34px.

## Build order

1. Scaffold (Vite/React/TS/Tailwind4/three) + tokens + global styles + fonts.
2. Asset copy + logo extraction script.
3. Shared UI: GlowCard, Modal, reveal + reduced-motion hooks.
4. Static sections top-to-bottom with final copy (hero sans shader → prophecy text acts → weaving band → room → days → founders → invitation → closing).
5. Scroll choreography module; wire pins, spins, draw, connector.
6. WebGL layer: CompassShader, HeroStrokeText draw/hover, CosmicScene, FireSphere (lazy).
7. Interactivity: modals, invite code, roster swap.
8. Responsive pass (880px / 560px breakpoints per prototype) + reduced-motion pass.
9. Verify: dev-server screenshots at 320/768/1024/1440, both scroll positions per pinned section; production build; bundle budget check (three.js lazy-chunked).

## Verification

- Visual: Claude Preview screenshots at 4 breakpoints, key scroll positions (hero, prophecy acts 1–3, weave mid/full, room, days+connector seam, founders ring, modals open, closing).
- Unit (Vitest): choreography math helpers (`lerp`, `vis`, ease), roster pool/swap logic, founders polar placement.
- A11y: keyboard-closable modals, focusable controls, `prefers-reduced-motion` disables all decorative motion, alt text on portraits.
- Perf: three.js + shader lazy-loaded; hero image preloaded; explicit image dimensions; production build passes.
