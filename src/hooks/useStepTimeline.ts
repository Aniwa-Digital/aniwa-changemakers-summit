import { useEffect, useRef } from 'react';
import { getLenis } from '../lib/smooth-scroll';

const ACTIVATION = 0.5;
const VIEW_W = 100;

type Point = { x: number; y: number };

/** Straight vertical line through the marker column center, first → last. */
function buildStraightPath(points: Point[]): string {
  if (points.length < 2) return '';
  const start = points[0];
  const end = points[points.length - 1];
  const x = VIEW_W / 2;
  return `M ${x.toFixed(2)} ${start.y.toFixed(2)} L ${x.toFixed(2)} ${end.y.toFixed(2)}`;
}

/** Marker centers in wrapper-local coords (matches painted positions). */
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

function pathLengthAtY(path: SVGPathElement, targetY: number, maxLength: number): number {
  let lo = 0;
  let hi = maxLength;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).y < targetY) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/** Scroll-driven step timeline: straight path fill + active/current step states. */
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

    let endLength = 0;
    let markerPathLengths: number[] = [];

    const layoutPath = () => {
      const points = markerPoints(wrapper, items);
      if (points.length < 2) return;

      const lastY = points[points.length - 1].y;
      const h = Math.max(wrapper.clientHeight, Math.ceil(lastY + 8));
      if (h <= 0) return;

      svg.setAttribute('viewBox', `0 0 ${VIEW_W} ${h}`);
      svg.setAttribute('preserveAspectRatio', 'none');
      /* Keep SVG tall enough to include the last marker when layout grows. */
      svg.style.height = `${h}px`;
      svg.style.bottom = 'auto';

      const d = buildStraightPath(points);
      trackPath.setAttribute('d', d);
      fillPath.setAttribute('d', d);

      endLength = fillPath.getTotalLength();
      markerPathLengths = points.map((pt) => pathLengthAtY(fillPath, pt.y, endLength));
      /* Snap last length to full path so the track/fill always reach #5. */
      if (markerPathLengths.length) {
        markerPathLengths[markerPathLengths.length - 1] = endLength;
      }

      fillPath.style.strokeDasharray = String(endLength);
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

    const updateFill = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const activationY = vh * ACTIVATION;
      const centers = markerCenters();
      const lastMarkerLength = markerPathLengths[markerPathLengths.length - 1] ?? endLength;

      if (reduce) {
        items.forEach((item, i) => {
          item.setAttribute('data-status', 'active');
          if (i === items.length - 1) item.setAttribute('data-current', '');
          else item.removeAttribute('data-current');
        });
        fillPath.style.strokeDashoffset = String(Math.max(endLength - lastMarkerLength, 0));
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

      if (currentIndex >= 0) {
        items[currentIndex].setAttribute('data-current', '');
      }

      if (!endLength || markerPathLengths.length !== items.length) return;

      const firstY = centers[0];
      const lastY = centers[centers.length - 1];

      let visibleLength = 0;
      if (activationY <= firstY) {
        visibleLength = 0;
      } else if (activationY >= lastY) {
        visibleLength = lastMarkerLength;
      } else {
        for (let i = 0; i < items.length - 1; i++) {
          const y0 = centers[i];
          const y1 = centers[i + 1];
          if (activationY >= y0 && activationY <= y1) {
            const t = (activationY - y0) / Math.max(y1 - y0, 1);
            visibleLength = markerPathLengths[i] + t * (markerPathLengths[i + 1] - markerPathLengths[i]);
            break;
          }
        }
      }

      fillPath.style.strokeDashoffset = String(Math.max(endLength - visibleLength, 0));
    };

    const relayout = () => {
      layoutPath();
      fillPath.style.strokeDashoffset = reduce
        ? String(Math.max(endLength - (markerPathLengths.at(-1) ?? endLength), 0))
        : String(endLength);
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
