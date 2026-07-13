// Compass line-art overlay. Renders compass-layers.svg on top of the WebGL
// swirl and spins it about its hub in sync with scroll (matching the rate the
// shader used to use).
import { useEffect, useRef, useState } from 'react';
import { loadCompassLayersSvg, signalHeroCompassResize } from '../../lib/compass-svg';

const SPIN_RATE = 0.0032; // radians per scrolled pixel (matches old CompassShader)
const COMPASS_CY = 0.57; // hub position as a fraction of the svg height
const COMPASS_H = 97.2; // compass height as a % of the container height

interface CompassOverlayProps {
  src?: string;
  /** When false, compass stays fixed (e.g. closing section). Default: true. */
  scrollSpin?: boolean;
  /** Stroke color for currentColor SVG layers. */
  color?: string;
  opacity?: number;
}

export default function CompassOverlay({
  src = '/assets/compass/compass-layers.svg',
  scrollSpin = true,
  color = '#7A5230',
  opacity = 0.2,
}: CompassOverlayProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const load = src === '/assets/compass/compass-layers.svg' ? loadCompassLayersSvg() : fetch(src).then((r) => r.text());
    load
      .then((text) => {
        if (!cancelled) setSvg(text);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || !svg) return;

    const svgEl = el.querySelector('svg');
    if (svgEl) {
      svgEl.removeAttribute('width');
      svgEl.setAttribute('height', '100%');
      svgEl.style.height = '100%';
      svgEl.style.width = 'auto';
      svgEl.style.display = 'block';
      // Override any inline SVG color (compass.svg ships as cream currentColor).
      svgEl.style.color = color;
      signalHeroCompassResize();
      requestAnimationFrame(signalHeroCompassResize);
    }

    let raf = 0;
    const translate = `translate(-50%, -${COMPASS_CY * 100}%)`;
    const update = () => {
      raf = 0;
      const sy = scrollSpin ? Math.max(0, window.scrollY || window.pageYOffset || 0) : 0;
      el.style.transform = `${translate} rotate(${sy * SPIN_RATE}rad)`;
    };
    update();

    if (!scrollSpin) return;

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [svg, scrollSpin, color]);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }} aria-hidden="true">
      {svg && (
        <div
          ref={innerRef}
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: `${COMPASS_H}%`,
            lineHeight: 0,
            transform: `translate(-50%, -${COMPASS_CY * 100}%)`,
            transformOrigin: `50% ${COMPASS_CY * 100}%`,
            opacity,
            color,
          }}
        />
      )}
    </div>
  );
}
