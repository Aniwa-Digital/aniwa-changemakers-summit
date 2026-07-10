/* Scroll choreography for the Aniwa Summit page — direct port of the handoff's
   summit-scroll.js. One requestAnimationFrame loop re-reads the DOM every frame;
   every function measures live getBoundingClientRect() so it is correct at any
   viewport width (the hero shader alone uses window.scrollY, on purpose). */

export const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

/** Progress of p through [a, b], clamped to [0, 1]. */
export const lerp = (p: number, a: number, b: number): number => {
  const raw = b === a ? (p - a) * 1e9 : (p - a) / (b - a);
  return clamp01(raw);
};

/** Fade in over [ia, ib] and (optionally) out over [oa, ob]. */
export const vis = (p: number, ia: number, ib: number, oa?: number, ob?: number): number => {
  const i = lerp(p, ia, ib);
  const o = oa !== undefined && ob !== undefined ? 1 - lerp(p, oa, ob) : 1;
  return Math.max(0, Math.min(i, o));
};

const MAX_DELAY = 0.24;
/** The weave draw completes at this fraction of the pin distance. */
export const WEAVE_DONE_AT = 0.85;
/** Radians of compass rotation per scrolled pixel (hero + apply compasses). */
export const SPIN_RATE = 0.0032;

function viewportHeight(): number {
  return window.innerHeight || document.documentElement.clientHeight;
}

/* ---- §00 The Prophecy: four acts cross-fade through the 300vh pin ---- */
function cineProgression(reduce: boolean): void {
  const cine = document.getElementById('prophecy');
  if (!cine) return;
  const a0 = cine.querySelector<HTMLElement>('[data-cine-act="0"]');
  const a1 = cine.querySelector<HTMLElement>('[data-cine-act="1"]');
  const a2 = cine.querySelector<HTMLElement>('[data-cine-act="2"]');
  const a3 = cine.querySelector<HTMLElement>('[data-cine-act="3"]');
  const a4 = cine.querySelector<HTMLElement>('[data-cine-act="4"]');
  const ember = cine.querySelector<HTMLElement>('[data-cine-ember]');
  const bg = cine.querySelector<HTMLElement>('[data-cine-bg]');
  const scrim = cine.querySelector<HTMLElement>('[data-cine-scrim]');
  const dark = cine.querySelector<HTMLElement>('[data-cine-dark]');
  const cosmic = cine.querySelector<HTMLElement>('[data-cine-cosmic]');
  const outro = cine.querySelector<HTMLElement>('[data-cine-outro]');
  const marker = cine.querySelector<HTMLElement>('[data-cine-marker]');
  const total = cine.offsetHeight - viewportHeight();
  const passed = -cine.getBoundingClientRect().top;
  const p = clamp01(passed / Math.max(total, 1));
  // The four prophecy acts play out in the first ~half of the (taller) pin so
  // the cosmic stage that follows has room to hold while its copy scrolls in.
  if (a0) a0.style.opacity = String(vis(p, -0.05, 0, 0.1, 0.14));
  if (a1) a1.style.opacity = String(vis(p, 0.14, 0.18, 0.24, 0.28));
  if (a2) a2.style.opacity = String(vis(p, 0.28, 0.32, 0.38, 0.42));
  if (a3) a3.style.opacity = String(lerp(p, 0.42, 0.48));
  if (ember) ember.style.opacity = (lerp(p, 0.42, 0.5) * 0.55).toFixed(3);
  // Beige field slowly fades into the land photo as the section scrolls in;
  // the white scrim fades in with it so the empty top stays cream (matching the
  // hero) and the wash only appears once the photo is present.
  const bgOpacity = reduce ? 1 : Number(lerp(p, 0, 0.13));
  if (scrim) scrim.style.opacity = bgOpacity.toFixed(3);

  // After "THIS TIME HAS ARRIVED": expand the photo and fade to solid dark.
  const endP = reduce ? 0 : clamp01((p - 0.46) / 0.08);
  const outroP = lerp(p, 0.94, 1);
  if (bg) {
    bg.style.opacity = bgOpacity.toFixed(3);
    if (!reduce) bg.style.transform = `scale(${(1 + endP * 0.4).toFixed(3)})`;
  }
  if (dark) dark.style.opacity = (endP * (1 - outroP)).toFixed(3);

  // Cosmic starfield fades in over the darkness and holds; the "Calling forth"
  // copy then scrolls up (translateY) into frame while the cosmos stays pinned.
  const cosmicIn = lerp(p, 0.54, 0.64);
  if (cosmic) cosmic.style.opacity = (cosmicIn * (1 - outroP)).toFixed(3);
  if (a4) {
    a4.style.opacity = lerp(p, 0.62, 0.74).toFixed(3);
    const rise = reduce ? 0 : (1 - lerp(p, 0.6, 0.82)) * 80;
    a4.style.transform = `translateY(${rise.toFixed(1)}px)`;
  }
  // Outro: wash only the cosmic/dark background back to bone; copy stays on top.
  if (outro) outro.style.opacity = outroP.toFixed(3);
  if (marker) {
    const segs = marker.children as HTMLCollectionOf<HTMLElement>;
    const cur = Math.min(3, Math.floor(p / 0.14));
    for (let i = 0; i < segs.length; i++) {
      const on = i <= cur;
      segs[i].style.width = on ? '40px' : '24px';
      segs[i].style.background = on ? 'rgba(160,74,42,0.8)' : 'rgba(0,0,0,0.2)';
    }
  }
}

/* ---- The Fellowship helix: tip-tracked growth. The strands' draw progress
   is tied to how far the band has scrolled past 55% of the viewport, so the
   growing tips always sit near mid-frame — the page appears to be tracking
   the strands as they grow. Each race lane ([data-race]) carries its own
   organic acceleration wobble so the two strands surge, slow, and pass each
   other while staying in frame. Seats fade in as the leading tip reaches
   their row ([data-helix-seat] carries each seat's fraction of the path). ---- */

/** Zero-mean, scroll-deterministic acceleration wobble for a race lane.
    Tapered to 0 at both ends so growth starts and completes cleanly. */
export function raceWobble(p: number, lane: number): number {
  const taper = clamp01(p * (1 - p) * 6);
  const w = Math.sin(p * 9.4 + lane * 2.6) + 0.6 * Math.sin(p * 17.3 + lane * 5.1);
  return 0.028 * taper * w;
}

function drawWeave(reduce: boolean): void {
  const bands = document.querySelectorAll<HTMLElement>('[data-weave-band]');
  if (!bands.length) return;
  const h = viewportHeight();

  bands.forEach((band) => {
    const strands = band.querySelectorAll<SVGPathElement>('[data-weave]');
    if (!strands.length) return;
    const r = band.getBoundingClientRect();
    const p = reduce ? 1 : clamp01((h * 0.55 - r.top) / Math.max(r.height, 1));
    strands.forEach((s) => {
      const d = parseFloat(s.getAttribute('data-delay') || '0') || 0;
      const raceAttr = s.getAttribute('data-race');
      const wob = raceAttr !== null && !reduce ? raceWobble(p, Number(raceAttr)) : 0;
      // Linear (no easing) so the tips stay near the 55%-viewport line.
      const local = clamp01((p - d) / (1 - MAX_DELAY) + wob);
      s.style.strokeDashoffset = reduce ? '0' : String(1 - local);
    });
    // Seats reveal as soon as they physically scroll into the viewport —
    // much earlier than the growing strand tip would reach them — so the
    // portraits are present the moment the section enters the frame.
    band.querySelectorAll<HTMLElement>('[data-helix-seat]').forEach((seat) => {
      const sr = seat.getBoundingClientRect();
      const on = reduce || (sr.top < h * 0.92 && sr.bottom > 0);
      seat.style.opacity = on ? '1' : '0';
      seat.style.transform = on ? 'translate(-50%, -50%)' : 'translate(-50%, -46%)';
    });

    /* Comet heads: park a glow orb on the newest point of each core strand.
       getPointAtLength gives the tip in viewBox units; convert to % of the
       band so the orbs scale with it. Hidden before growth starts, after it
       completes, and under reduced motion. */
    band.querySelectorAll<HTMLElement>('[data-helix-tip]').forEach((tip) => {
      const idx = tip.getAttribute('data-helix-tip');
      const path = band.querySelector<SVGPathElement>(`[data-tip-source="${idx}"]`);
      if (!path || !path.ownerSVGElement) return;
      const d = parseFloat(path.getAttribute('data-delay') || '0') || 0;
      const raceAttr = path.getAttribute('data-race');
      const wob = raceAttr !== null && !reduce ? raceWobble(p, Number(raceAttr)) : 0;
      const local = clamp01((p - d) / (1 - MAX_DELAY) + wob);
      if (reduce || local <= 0.002 || local >= 0.998) {
        tip.style.opacity = '0';
        return;
      }
      const pt = path.getPointAtLength(local * path.getTotalLength());
      const vb = path.ownerSVGElement.viewBox.baseVal;
      tip.style.left = `${((pt.x / vb.width) * 100).toFixed(3)}%`;
      tip.style.top = `${((pt.y / vb.height) * 100).toFixed(3)}%`;
      tip.style.opacity = '1';
    });
  });
}

/* §07 compass spins as the apply section scrolls up. Centered by negative
   margins (never translate) because this write clobbers `transform`. */
function spinApplyCompass(reduce: boolean): void {
  const img = document.querySelector<HTMLElement>('[data-apply-compass]');
  const sec = document.getElementById('apply');
  if (!img || !sec || img.closest('[data-drag-ring]')) return;
  const top = sec.getBoundingClientRect().top;
  const rot = reduce ? 0 : Math.max(0, -top) * SPIN_RATE;
  img.style.transform = `rotate(${rot.toFixed(4)}rad)`;
}

/* The faint background compasses drift ±70px against scroll. */
function compassParallax(reduce: boolean): void {
  if (reduce) return;
  const comps = document.querySelectorAll<HTMLElement>('[data-compass]');
  const h = viewportHeight();
  comps.forEach((c, i) => {
    const wrap = c.parentElement;
    if (!wrap) return;
    const r = wrap.getBoundingClientRect();
    const fromCenter = r.top + r.height / 2 - h / 2;
    const dir = i % 2 ? -1 : 1;
    const dy = Math.max(-70, Math.min(70, fromCenter * -0.05 * dir));
    c.style.transform = `translateY(${dy.toFixed(1)}px)`;
  });
}

/* The ember stroke linking the §03 outcome box down across the section seam to
   the §07 compass's north tip. Measured from live rects every frame. */
function positionConnector(): void {
  const wrap = document.querySelector<HTMLElement>('[data-connector]');
  const line = document.querySelector<HTMLElement>('[data-connector-line]');
  const outcome = document.querySelector<HTMLElement>('[data-outcome-box]');
  const wf = document.getElementById('work-flow');
  const compass = document.querySelector<HTMLElement>('[data-apply-compass]');
  if (!wrap || !line || !outcome || !wf || !compass) return;
  const wfTop = wf.getBoundingClientRect().top;
  const outB = outcome.getBoundingClientRect().bottom;
  const cTop = compass.getBoundingClientRect().top;
  let len = Math.round(cTop + 8 - outB);
  if (len < 24) len = 24;
  wrap.style.top = `${Math.round(outB - wfTop)}px`;
  line.style.height = `${len}px`;
}

/** Start the choreography loop. Returns a stop function. */
export function startScrollChoreography(): () => void {
  const reduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = 0;
  let running = true;

  const tick = () => {
    if (!running) return;
    cineProgression(reduce);
    compassParallax(reduce);
    spinApplyCompass(reduce);
    positionConnector();
    drawWeave(reduce);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
  };
}
