import { useEffect, useRef } from 'react';
import { getLenis } from '../lib/smooth-scroll';

const ACTIVATION = 0.5;
const VIEW_W = 100;
const CURVE_AMP = 22;
/** Stub past #4 center so the stroke lands inside the disc. */
const END_PAD = 20;

type Point = { x: number; y: number };

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

/** S-curve through points, alternating left / right between steps. */
function buildCurvePath(points: Point[]): string {
  if (points.length < 2) return '';
  const cx = VIEW_W / 2;
  let d = `M ${cx.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let i = 0; i < points.length - 1; i++) {
    const y0 = points[i].y;
    const y1 = points[i + 1].y;
    const dy = y1 - y0;
    const side = i % 2 === 0 ? 1 : -1;
    const bulge = side * CURVE_AMP;
    d += ` C ${(cx + bulge).toFixed(2)} ${(y0 + dy * 0.33).toFixed(2)}, ${(cx + bulge).toFixed(2)} ${(y0 + dy * 0.67).toFixed(2)}, ${cx.toFixed(2)} ${y1.toFixed(2)}`;
  }

  return d;
}

function markerPoints(wrapper: HTMLElement, items: HTMLElement[]): Point[] {
  const wr = wrapper.getBoundingClientRect();
  if (wr.width <= 0) return [];

  return items.map((item) => {
    const marker = item.querySelector<HTMLElement>('[data-step-timeline-marker]');
    if (!marker) return { x: VIEW_W / 2, y: 0 };
    const r = marker.getBoundingClientRect();
    return {
      x: VIEW_W / 2,
      y: r.top - wr.top + r.height / 2,
    };
  });
}

/**
 * Arc-length fractions (0–1) at each marker, measured on the live fill path
 * before pathLength normalization (must not use a 0×0 scratch SVG).
 */
function measureFractions(fillPath: SVGPathElement, points: Point[], fullD: string): number[] {
  fillPath.removeAttribute('pathLength');
  fillPath.setAttribute('d', fullD);
  const total = fillPath.getTotalLength();
  if (total <= 0) return points.map((_, i) => (i === 0 ? 0 : 1));

  const fracs = points.map((_, i) => {
    if (i === 0) return 0;
    if (i === points.length - 1) return 1;
    /* Prefix through this marker — same control points as the full path. */
    fillPath.setAttribute('d', buildCurvePath(points.slice(0, i + 1)));
    return clamp(fillPath.getTotalLength() / total, 0, 1);
  });

  fillPath.setAttribute('d', fullD);
  return fracs;
}

/** Scroll progress 0→1 as the activation line sweeps from marker 1 → marker N. */
function fillProgress(activationY: number, centers: number[], fracs: number[]): number {
  const last = centers.length - 1;
  if (last < 1 || fracs.length !== centers.length) return 0;

  if (activationY <= centers[0]) return 0;
  if (activationY >= centers[last]) return 1;

  for (let i = 0; i < last; i++) {
    const y0 = centers[i];
    const y1 = centers[i + 1];
    if (activationY < y0 || activationY > y1) continue;
    const t = (activationY - y0) / Math.max(y1 - y0, 1);
    const a = fracs[i] ?? 0;
    const b = fracs[i + 1] ?? 1;
    return a + t * (b - a);
  }

  return 0;
}

/** Scroll-driven step timeline: progressive S-curve fill + step states. */
export function useStepTimeline<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const wrapper = root.querySelector<HTMLElement>('[data-step-timeline-wrapper]');
    const svg = root.querySelector<SVGSVGElement>('.purpose-timeline__curve');
    const trackPath = root.querySelector<SVGPathElement>('[data-step-timeline-track]');
    const fillPath = root.querySelector<SVGPathElement>('[data-step-timeline-fill]');
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-step-timeline-item]'));
    if (!wrapper || !svg || !trackPath || !fillPath || !items.length) return;

    let fracs: number[] = [];

    const layoutPath = () => {
      const points = markerPoints(wrapper, items);
      if (points.length < 2) return;

      const lastCenterY = points[points.length - 1].y;
      const pathEndY = lastCenterY + END_PAD;
      const h = Math.max(wrapper.clientHeight, Math.ceil(pathEndY + 12));
      if (h <= 0) return;

      svg.setAttribute('viewBox', `0 0 ${VIEW_W} ${h}`);
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.style.height = `${h}px`;
      svg.style.bottom = 'auto';

      const drawn = points.map((pt, i) =>
        i === points.length - 1 ? { x: VIEW_W / 2, y: pathEndY } : pt,
      );
      const d = buildCurvePath(drawn);

      trackPath.setAttribute('d', d);
      trackPath.setAttribute('fill', 'none');
      fillPath.setAttribute('fill', 'none');

      /*
       * Measure real arc fractions on the painted path, then normalize dashes
       * with pathLength=1 so the stroke always reaches #4 under SVG stretching.
       */
      fracs = measureFractions(fillPath, points, d);

      fillPath.setAttribute('d', d);
      fillPath.setAttribute('pathLength', '1');
      /* dash + gap both 1 → offset 1 hides, offset 0 reveals full path */
      fillPath.style.strokeDasharray = '1 1';
      trackPath.style.strokeDasharray = 'none';
      trackPath.style.strokeDashoffset = '0';
    };

    const markerCenters = () =>
      items.map((item) => {
        const marker = item.querySelector('[data-step-timeline-marker]');
        if (!marker) return 0;
        const r = marker.getBoundingClientRect();
        return r.top + r.height / 2;
      });

    const setFillProgress = (progress: number) => {
      fillPath.style.strokeDashoffset = String(1 - clamp(progress, 0, 1));
    };

    const updateFill = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const activationY = vh * ACTIVATION;
      const centers = markerCenters();
      const last = items.length - 1;

      if (reduce) {
        items.forEach((item, i) => {
          item.setAttribute('data-status', 'active');
          if (i === last) item.setAttribute('data-current', '');
          else item.removeAttribute('data-current');
        });
        setFillProgress(1);
        return;
      }

      let currentIndex = -1;
      items.forEach((item, i) => {
        if (centers[i] <= activationY) {
          item.setAttribute('data-status', 'active');
          currentIndex = i;
        } else {
          item.removeAttribute('data-status');
        }
        item.removeAttribute('data-current');
      });
      if (currentIndex >= 0) items[currentIndex].setAttribute('data-current', '');

      if (fracs.length !== items.length) return;

      setFillProgress(fillProgress(activationY, centers, fracs));
    };

    const relayout = () => {
      layoutPath();
      updateFill();
    };

    relayout();
    requestAnimationFrame(relayout);
    requestAnimationFrame(() => requestAnimationFrame(relayout));
    void document.fonts?.ready?.then(() => relayout());

    window.addEventListener('scroll', updateFill, { passive: true });
    window.addEventListener('resize', relayout);

    const lenis = getLenis();
    lenis?.on('scroll', updateFill);

    const ro = new ResizeObserver(relayout);
    ro.observe(root);
    ro.observe(wrapper);
    items.forEach((item) => ro.observe(item));

    return () => {
      window.removeEventListener('scroll', updateFill);
      window.removeEventListener('resize', relayout);
      lenis?.off('scroll', updateFill);
      ro.disconnect();
    };
  }, []);

  return rootRef;
}
