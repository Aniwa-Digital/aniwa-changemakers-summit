// GlowCard — cursor-following spotlight glow frame, ported from the handoff.
// Warm-tuned defaults keep the glow inside the brand's ember range.
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type GlowColor = 'ember' | 'gold' | 'orange' | 'blue' | 'purple';

const glowColorMap: Record<GlowColor, { base: number; spread: number; sat: number; lightBorder: number; lightBg: number }> = {
  ember: { base: 16, spread: 30, sat: 78, lightBorder: 52, lightBg: 60 },
  gold: { base: 38, spread: 20, sat: 62, lightBorder: 58, lightBg: 64 },
  orange: { base: 30, spread: 200, sat: 100, lightBorder: 50, lightBg: 70 },
  blue: { base: 220, spread: 200, sat: 100, lightBorder: 50, lightBg: 70 },
  purple: { base: 280, spread: 300, sat: 100, lightBorder: 50, lightBg: 70 },
};

// Inject the ::before/::after glow-border rules once for all instances.
const GLOW_STYLE_ID = 'glowcard-pseudo-styles-v2';

function ensureGlowStyles(): void {
  if (typeof document === 'undefined' || document.getElementById(GLOW_STYLE_ID)) return;
  const css = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      -webkit-mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      -webkit-mask-clip: padding-box, border-box;
      mask-clip: padding-box, border-box;
      -webkit-mask-composite: source-in;
      mask-composite: intersect;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(var(--hue, 30) calc(var(--saturation, 80) * 1%) calc(var(--lightness, 52) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
      );
      filter: brightness(1.7);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(30 22% 96% / var(--border-light-opacity, 0.9)), transparent 100%
      );
    }
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
    }
    [data-glow] > [data-glow]::before { inset: -10px; border-width: 10px; }
    /* Touch devices never fire pointermove, which would leave the spotlight
       stuck as a bright blob at its last/default position — hide it there. */
    @media (hover: none) {
      [data-glow]::before,
      [data-glow]::after,
      [data-glow] [data-glow] {
        display: none;
      }
      [data-glow] {
        background-image: none !important;
      }
    }
  `;
  const el = document.createElement('style');
  el.id = GLOW_STYLE_ID;
  el.textContent = css;
  document.head.appendChild(el);
}

interface GlowCardProps {
  children?: ReactNode;
  glowColor?: GlowColor;
  radius?: number;
  border?: number;
  size?: number;
  style?: CSSProperties;
}

export function GlowCard({ children, glowColor = 'ember', radius = 14, border = 2, size = 260, style }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGlowStyles();
    const el = cardRef.current;
    if (!el) return;

    const syncPointer = (e: PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--x', (e.clientX - rect.left).toFixed(2));
      card.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2));
      card.style.setProperty('--y', (e.clientY - rect.top).toFixed(2));
      card.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2));
    };
    el.addEventListener('pointermove', syncPointer, { passive: true });
    return () => el.removeEventListener('pointermove', syncPointer);
  }, []);

  const g = glowColorMap[glowColor];

  const cssVars = {
    '--base': g.base,
    '--spread': g.spread,
    '--saturation': g.sat,
    '--lightness': g.lightBorder,
    '--radius': radius,
    '--border': border,
    '--size': size,
    '--outer': 1,
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 200) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    '--bg-spot-opacity': 0.08,
    '--border-spot-opacity': 0.9,
    '--border-light-opacity': 0.7,
  } as CSSProperties;

  const cardStyle: CSSProperties = {
    position: 'relative',
    borderRadius: `${radius}px`,
    border: 'var(--border-size) solid hsl(30 12% 60% / 0.14)',
    backgroundColor: 'hsl(255 34% 9% / 0.55)',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 30) calc(var(--saturation, 80) * 1%) ${g.lightBg}% / var(--bg-spot-opacity, 0.08)), transparent)`,
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    boxShadow: '0 1rem 2.4rem -1.2rem #000',
    ...cssVars,
    ...style,
  };

  return (
    <div ref={cardRef} data-glow="" style={cardStyle}>
      <div data-glow="" />
      {children}
    </div>
  );
}
