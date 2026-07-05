# Revision Handoff — Aniwa Changemakers Summit

Read this first if you're picking up the project to apply team feedback in a
fresh session. It's written for someone (human or a new Claude session) with
**zero prior context**. Companion doc: [PLAN.md](PLAN.md) (original build plan).

---

## 1. What this is

A cinematic, scroll-driven, one-page marketing site for the **Aniwa Changemakers
Summit** — a private, by-invitation gathering (October 23–25, 2026, a private
estate in Northern California) where Indigenous wisdom keepers meet
frontier-technology builders. Organized by Aniwa / the Huya Aniwa Foundation.

> **Naming note:** the event was renamed from *Convergence Summit* → *Changemakers
> Summit* partway through. The word "convergence/converging" still appears
> **intentionally** in two spots (see §9). Don't blanket find-replace it.

---

## 2. Quick start (do this first)

```bash
cd "/Users/knucklefat/Claude Home/Projects/Aniwa Summit/aniwa-summit-app"
git status          # check for uncommitted work-in-progress before you start
npm install         # if node_modules isn't present
npm run dev         # dev server → http://localhost:5180
```

- `npm run build` — typecheck + production build (must pass before shipping)
- `npm test` — unit tests (choreography math, roster/ring logic; 21 tests)

If `git status` shows uncommitted changes you didn't make, someone left
work-in-progress — reconcile it before committing your own changes.

---

## 3. Where everything lives

| Path | What |
|---|---|
| `aniwa-summit-app/` | **The app** (this repo) |
| `../design_handoff_aniwa_summit_v1/` | Original design prototype + design-system tokens. Reference only — the source of truth for intended look/behavior. |
| `docs/PLAN.md` | Original implementation plan & locked decisions |
| `docs/REVISION-HANDOFF.md` | This doc |

---

## 4. Stack

- **Vite 6 · React 19 · TypeScript · Tailwind v4** (design tokens as CSS custom properties)
- **three.js 0.160** — the prophecy starfield/beam scene + the closing fire orb (both lazy-loaded)
- **Raw WebGL2** — the hero compass shader
- **Vitest** — unit tests for pure logic
- No backend, no data fetching. All content is static in-repo.

---

## 5. Deploy & infrastructure

| | Value |
|---|---|
| **Live site** | https://aniwa-changemakers-summit.netlify.app |
| **GitHub repo** | https://github.com/knucklefat/aniwa-changemakers-summit (private, branch `main`) |
| **Netlify project** | `aniwa-changemakers-summit` · site ID `d87b83dd-c64a-4537-8733-77573a060fea` |
| **Build config** | `netlify.toml` — build `npm run build`, publish `dist` |

**Continuous deployment is live.** The workflow is fully hands-off:

> edit → `git commit` → `git push origin main` → Netlify auto-builds & publishes (~15s)

You do **not** need to deploy manually. Just push to `main`. To confirm a deploy,
check the live site or the Netlify dashboard. (A docs-only change like this file
still triggers a rebuild, but the built site is identical — harmless.)

---

## 6. Site structure — section → file map

Sections render top-to-bottom in [`src/App.tsx`](../src/App.tsx). Each is its own
folder under `src/components/`:

| # | Section | Primary file | Notes |
|---|---|---|---|
| — | Hero | `hero/Hero.tsx` | Nav (ATTENDEE LOGIN → login modal); "HUYA ANIWA FOUNDATION / presents / CHANGEMAKERS SUMMIT / Oct 23–25, 2026 / Sonoma County / An invite-only convergence". No scroll cue. WebGL compass: `hero/CompassShader.tsx`. |
| — | Prophecy | `prophecy/Prophecy.tsx` | 300vh pinned; **4 acts** cross-fade on scroll (act 2 = "Converging the strengths…", act 3 = "THIS TIME HAS ARRIVED" + lightning bolt). three.js: `prophecy/CosmicScene.tsx`. |
| — | Weaving | `weaving/Weaving.tsx` | "A Unifying Mission" copy + **Fellowship of Changemakers vertical double helix** — all 16 people on one strand, large round headshots, no Builder/Keeper badges. Geometry: `helixPath()` in `content.ts`. |
| — | Room | `room/Room.tsx` | Standalone skills band: stats grid ("WITH SKILLSETS SPANNING") + partner-logo grid. No roster (people live on the helix). |
| — | Days | `days/Days.tsx` | "Four Elements — One Mission." land header, epic element quartet (topics huge, element words small), Mind + Body + Planet overview, outcome box, ember connector into Founders. Day cards removed. |
| — | Founders | `founders/FoundersCircle.tsx` | Polar ring of 7 + open seat; blurb; headshots link to LinkedIn (Angela Katragadda has no URL yet). Modals: `founders/NominationModal.tsx`, `founders/LoginModal.tsx`. |
| — | Invitation | `invitation/Invitation.tsx` | "Entry is the first ceremony." + participation copy, 6-step process, invite-code card. |
| — | Closing | `closing/Closing.tsx` | "We will see you at the fire." + "Where the Earth and the future meet." over the fire orb; contact + nonprofit + compass-credit footnote in a separate footer strip below. |

**Note:** all "§ 0N —" eyebrow labels were removed from the UI (Oct-2026-feedback round). |

### Registration & invite codes (added July 2026)

The site now has a small backend — Netlify Functions + Netlify Blobs:

| Piece | Where | What |
|---|---|---|
| `#/register` | `src/components/register/RegisterPage.tsx` | Invite-gated registration: contact info, industry, expertise, social links, public-directory toggle. Submit stores the registration and forwards it to the team. |
| `#/codes` | `src/components/register/AdminCodesPage.tsx` | Team-only (shared password) invite-code generator. Every code records **who assigned it**, who it's for, and — once used — **who redeemed it and when**. Also lists all received registrations. |
| Functions | `netlify/functions/` | `codes` (admin generate/list), `validate-code` (public), `register` (redeem + store + forward). Data lives in Netlify Blobs stores `invite-codes` and `registrations`. |
| Email | Netlify Forms `registrations` | The register function forwards each submission to Netlify Forms. **Email notification is NOT yet configured** — once `summit@huyaaniwa.org` exists, add it under Netlify dashboard → Forms → Form notifications. Until then the team reviews registrations on `#/codes`. |
| Auth | `ANIWA_ADMIN_KEY` env var (Netlify) | Shared team password for `#/codes`. Rotate in Netlify → Environment variables (requires redeploy). |

Codes are **single-use**, 6 characters (unambiguous letters + numbers, e.g.
`K7M2QX`); the "For" field is optional. The invite-code card on the
main page validates against the real store and routes valid codes to `#/register`.
Routing is hash-based (`App.tsx`); the main scroll page is untouched otherwise.

Shared UI: `components/ui/GlowCard.tsx` (cursor-following spotlight card),
`components/ui/Modal.tsx` (scrim + card shell for both modals).

---

## 7. Where to change what

| You want to change… | Edit… |
|---|---|
| **List data** (names, roles, portraits, stats, days, elements, steps, partner logos, founders ring) | `src/lib/content.ts` — one file holds all structured content. |
| **Section eyebrow labels** (`§ 0N — …`) | Inline in each section component (search the file for `§`). |
| **Headlines / body copy / prose** | Inline in the relevant section component's JSX. |
| **Colors, type, spacing, radii, motion tokens** | `src/styles/tokens.css` (design tokens). Global helper classes & responsive rules: `src/styles/global.css`. |
| **Scroll behavior** (pins, compass spins, strand draw, connector, roster-height matching) | `src/lib/scroll-choreography.ts` (single rAF loop). |
| **Reveal-on-scroll / roster swap / reduced-motion** | `src/hooks/useReveal.ts`, `useRosterSwap.ts`, `useReducedMotion.ts`. |
| **Images / portraits / logos / compass / wordmark** | `public/assets/…` (referenced by absolute `/assets/…` paths). |
| **Page `<title>` / meta description / favicon** | `index.html`. |

**Label format:** labels are typed `§ 0N — Label` (em dash, space after §) and render
**uppercase** via the `.eye` CSS class — so the source casing is cosmetic. Keep the
em-dash format for consistency across all five.

---

## 8. How to make & ship a change

1. Edit the file(s) per the table above.
2. `npm run build` — must pass (typecheck + compile). Fix any errors.
3. `npm test` — if you touched logic in `src/lib/`.
4. Eyeball it: `npm run dev` → http://localhost:5180, or the preview tooling.
5. `git add <files> && git commit -m "…" && git push origin main`.
6. Netlify auto-deploys in ~15s. Verify on the live URL.

Keep commits focused (one logical change each). Conventional-commit prefixes are
used here: `feat:`, `fix:`, `chore:`, `docs:`.

---

## 9. Change history (what's already been done)

Most recent first:

0. **July 2026 team-feedback round** (this session): hero title stack; prophecy
   split into 4 acts w/ lightning bolt; Weaving + Contributors merged into the
   **Fellowship of Changemakers vertical helix** (roster/swap machinery deleted);
   skills/logos now standalone; Days → "Four Elements — One Mission" quartet
   (day cards removed); § labels removed everywhere; founders blurb + LinkedIn
   links (Angela Katragadda still missing a URL); participation copy; closing
   footer strip w/ tagline + compass credit; portraits converted to webp.
1. **Renamed repo + Netlify site** to `aniwa-changemakers-summit`. Old URL
   `aniwa-convergence-summit.netlify.app` now **404s** (Netlify releases the old
   subdomain). GitHub redirects the old repo URL to the new one.
2. **Renamed the event** *Convergence Summit → Changemakers Summit* in site
   content: hero headline, page title, meta description.
3. **Renumbered/renamed section labels** to the sequential set in §6
   (§01 Convergence, §02 Contributors, §03 The Work, §04 Founders Circle, §05 Invitation).
4. Set up **GitHub + Netlify continuous deployment**.
5. Initial build from the design handoff, first Netlify deploy, repo cleanup.

**Intentionally left as-is** (do not "fix" without a decision):
- **§ 01 — Convergence** label — names the *theme* of the weaving section, not the
  event. Kept deliberately. Team may still want it changed.
- Prophecy copy *"Converging the strengths of opposing paradigms…"* — narrative
  prose about the concept, not the event name.

---

## 10. Open items & known limitations

Things a reviewer/launch checklist should weigh:

- **Login & nomination are prototype-only.** The login modal (Google/Facebook/Apple)
  and the nomination form don't authenticate or submit anywhere — no backend, no
  OAuth. Wire to real services before launch.
- **Invite-code flow is client-only** — any non-empty code shows the success state.
- **Partner logos** (Google, Apple, Disney+, Netflix, PepsiCo, Nat Geo, Block,
  Stanford, etc.) were extracted from the prototype. They're third-party
  trademarks — confirm usage rights before public launch.
- **Site is publicly reachable, no gating.** Add a password/SSO in Netlify if it
  should stay private pre-launch.
- **Not yet tested:** cross-browser (Firefox/Safari), Lighthouse/perf audit, a
  full accessibility audit. Reduced-motion paths are implemented but weren't
  OS-emulated here.
- **URL could be shortened** to `changemakers-summit.netlify.app` if the team
  prefers (means one more URL change; the current one breaks).
- **Two prototype sections were excluded** ("Why this is real" / proof, and "The
  Land") — they were `display:none` in the original. Add them if the team wants.

---

## 11. Fidelity gotchas (respect these when editing visuals)

- **Compass art center = 57% of its height** (not 50% — the artwork isn't centered
  in its viewBox). All compass centering/rotation uses `transform-origin: 50% 57%`
  and negative-margin centering. The hero shader hard-codes this too.
- **Sticky sections need `overflow: clip`** (not `hidden`) on ancestors, or pinning
  breaks.
- **The §03→§04 connector line** is measured from live layout every frame — never
  hard-code its length/position.
- **WebGL scenes render opaque** and are composited with `mix-blend-mode: screen`
  on a wrapper `div` so black drops out over the photos.
- **All decorative motion is gated** behind `prefers-reduced-motion`.
- **Preview-tooling quirk:** deep-scroll screenshots sometimes return blank due to
  a scroll/rAF race. Verify via DOM eval (read `textContent`, computed styles)
  rather than trusting a blank screenshot.

---

## 12. Revision worklist (fill in from team feedback)

Drop each feedback item here so a working session has a clear list. Suggested
columns:

| # | Section / file | Feedback | Decision | Status |
|---|---|---|---|---|
| 1 | | | | ☐ |
| 2 | | | | ☐ |
| 3 | | | | ☐ |

When you start executing: confirm the target file from §6/§7, make the edit,
`npm run build`, commit, push. Batch related items into focused commits.
