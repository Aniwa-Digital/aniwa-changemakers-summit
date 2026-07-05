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

/* ---- §00 The Prophecy: three acts cross-fade through the 300vh pin ---- */
function cineProgression(reduce: boolean): void {
  const cine = document.getElementById('prophecy');
  if (!cine) return;
  const a0 = cine.querySelector<HTMLElement>('[data-cine-act="0"]');
  const a1 = cine.querySelector<HTMLElement>('[data-cine-act="1"]');
  const a2a = cine.querySelector<HTMLElement>('[data-cine-2a]');
  const a2b = cine.querySelector<HTMLElement>('[data-cine-2b]');
  const ember = cine.querySelector<HTMLElement>('[data-cine-ember]');
  const bg = cine.querySelector<HTMLElement>('[data-cine-bg]');
  const marker = cine.querySelector<HTMLElement>('[data-cine-marker]');
  const total = cine.offsetHeight - viewportHeight();
  const passed = -cine.getBoundingClientRect().top;
  const p = clamp01(passed / Math.max(total, 1));
  if (a0) a0.style.opacity = String(vis(p, -0.1, 0, 0.26, 0.34));
  if (a1) a1.style.opacity = String(vis(p, 0.34, 0.42, 0.6, 0.68));
  if (a2a) a2a.style.opacity = String(lerp(p, 0.66, 0.73));
  if (a2b) a2b.style.opacity = String(lerp(p, 0.8, 0.88));
  if (ember) ember.style.opacity = (lerp(p, 0.55, 0.95) * 0.55).toFixed(3);
  if (bg && !reduce) {
    bg.style.transform = `scale(${(1.05 + p * 0.1).toFixed(3)}) translateY(${(-p * 3).toFixed(2)}%)`;
  }
  if (marker) {
    const segs = marker.children as HTMLCollectionOf<HTMLElement>;
    const cur = Math.min(2, Math.floor(p / 0.34));
    for (let i = 0; i < segs.length; i++) {
      const on = i <= cur;
      segs[i].style.width = on ? '40px' : '24px';
      segs[i].style.background = on ? 'rgba(160,74,42,0.8)' : 'rgba(255,255,255,0.2)';
    }
  }
}

/* ---- §01 The Weaving: strands draw with scroll through the pin. Two bands
   exist (horizontal desktop, vertical mobile) — only one is displayed at a
   time, but both animate so a viewport resize never strands a blank weave. ---- */
function drawWeave(reduce: boolean): void {
  const bands = document.querySelectorAll<HTMLElement>('[data-weave-band]');
  if (!bands.length) return;
  const sec = document.getElementById('weaving');
  const pin = document.querySelector<HTMLElement>('[data-weave-pin]');
  const h = viewportHeight();

  // Pin math only applies while the stage is actually sticky (mobile unpins
  // it via CSS); otherwise each band draws as it rises through the viewport.
  const pinned = !!(pin && getComputedStyle(pin).position === 'sticky');
  let pinP: number | null = null;
  if (pinned && sec && sec.offsetHeight > h * 1.2) {
    const total = sec.offsetHeight - h;
    const passed = -sec.getBoundingClientRect().top;
    // Finish the full draw within the first 85% of the pin, holding briefly on
    // the completed weave before the section releases.
    pinP = clamp01(clamp01(passed / Math.max(total, 1)) / WEAVE_DONE_AT);
  }

  bands.forEach((band) => {
    const strands = band.querySelectorAll<SVGPathElement>('[data-weave]');
    if (!strands.length) return;
    let p: number;
    if (pinP !== null) {
      p = pinP;
    } else {
      const top = band.getBoundingClientRect().top;
      p = clamp01((h * 0.7 - top) / (h * 0.85));
    }
    strands.forEach((s) => {
      const d = parseFloat(s.getAttribute('data-delay') || '0') || 0;
      const local = clamp01((p - d) / (1 - MAX_DELAY));
      s.style.strokeDashoffset = reduce ? '0' : String(1 - easeOutCubic(local));
    });
  });
}

/* Weave compass: exactly one full clockwise 2π turn by the time the weave
   finishes drawing, continuing past it. */
function spinWeaveCompass(reduce: boolean): void {
  const img = document.querySelector<HTMLElement>('[data-weave-compass]');
  const sec = document.getElementById('weaving');
  if (!img || !sec) return;
  const h = viewportHeight();
  const passed = Math.max(0, -sec.getBoundingClientRect().top);
  const weaveDone = WEAVE_DONE_AT * Math.max(sec.offsetHeight - h, 1);
  const rot = reduce ? 0 : (passed / weaveDone) * Math.PI * 2;
  img.style.transform = `rotate(${rot.toFixed(4)}rad)`;
}

/* §07 compass spins as the apply section scrolls up. Centered by negative
   margins (never translate) because this write clobbers `transform`. */
function spinApplyCompass(reduce: boolean): void {
  const img = document.querySelector<HTMLElement>('[data-apply-compass]');
  const sec = document.getElementById('apply');
  if (!img || !sec) return;
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

/* §02 The Room: on desktop the roster grid spans exactly the left rail's
   height (equal 1fr rows, portraits flexing). Width-dependent, so re-measured
   each frame; the flex-mode styles are applied only on mode change. */
let lastRoomMode: boolean | null = null;

function matchRoomHeights(): void {
  const room = document.getElementById('room');
  if (!room) return;
  const g2 = room.querySelector<HTMLElement>('.grid-2');
  const roster = room.querySelector<HTMLElement>('.grid-3');
  if (!g2 || !roster) return;
  const left = g2.children[0] as HTMLElement | undefined;
  if (!left) return;
  const cards = roster.children as HTMLCollectionOf<HTMLElement>;
  const desktop = (window.innerWidth || document.documentElement.clientWidth) > 880;
  if (desktop) {
    const rows = Math.max(1, Math.ceil(cards.length / 3));
    roster.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    roster.style.height = `${Math.round(left.getBoundingClientRect().height)}px`;
  } else {
    roster.style.gridTemplateRows = '';
    roster.style.height = '';
  }
  if (lastRoomMode !== desktop) {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const wrap = card.querySelector<HTMLElement>('div'); // crossfade wrapper
      if (!wrap) continue;
      const portrait = wrap.querySelector<HTMLElement>('div'); // holds the img
      if (!portrait) continue;
      if (desktop) {
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        wrap.style.display = 'flex';
        wrap.style.flexDirection = 'column';
        wrap.style.flex = '1 1 0';
        wrap.style.minHeight = '0';
        portrait.style.aspectRatio = '';
        portrait.style.flex = '1 1 0';
        portrait.style.minHeight = '0';
      } else {
        card.style.display = '';
        card.style.flexDirection = '';
        wrap.style.display = '';
        wrap.style.flexDirection = '';
        wrap.style.flex = '';
        wrap.style.minHeight = '';
        portrait.style.aspectRatio = '4/5';
        portrait.style.flex = '';
        portrait.style.minHeight = '';
      }
    }
    lastRoomMode = desktop;
  }
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
    spinWeaveCompass(reduce);
    spinApplyCompass(reduce);
    positionConnector();
    drawWeave(reduce);
    matchRoomHeights();
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    lastRoomMode = null;
  };
}
