// CHANGEMAKERS headline: white fill, stroke draw-in on load, cursor-following
// rainbow OUTER glow on hover (radial mask). The raw rainbow hexes are
// intentional per the handoff. Web Animations API for the draw; direct
// attribute writes for the cursor mask (no re-render). Respects reduced motion.
import { useEffect, useId, useRef, useState } from 'react';

interface HeroStrokeTextProps {
  text: string;
  fontSize?: number;
  drawSeconds?: number;
}

const DASH = 8000;

export function HeroStrokeText({ text, fontSize = 150, drawSeconds = 3.6 }: HeroStrokeTextProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const maskRef = useRef<SVGRadialGradientElement>(null);
  const animRef = useRef<SVGTextElement>(null);
  const [hovered, setHovered] = useState(false);

  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const gid = `${uid}-grad`;
  const fid = `${uid}-glow`;
  const mid = `${uid}-mask`;
  const rid = `${uid}-reveal`;

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = animRef.current;
    if (!el) return;
    el.style.strokeDasharray = String(DASH);
    if (reduce) {
      el.style.strokeDashoffset = '0';
      return;
    }
    el.style.strokeDashoffset = String(DASH);
    const a = el.animate([{ strokeDashoffset: DASH }, { strokeDashoffset: 0 }], {
      duration: drawSeconds * 1000,
      easing: 'cubic-bezier(.22,1,.36,1)',
      fill: 'forwards',
    });
    return () => a.cancel();
  }, [drawSeconds]);

  const move = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    const m = maskRef.current;
    if (!svg || !m) return;
    const r = svg.getBoundingClientRect();
    if (!r.width || !r.height) return;
    m.setAttribute('cx', `${((clientX - r.left) / r.width) * 100}%`);
    m.setAttribute('cy', `${((clientY - r.top) / r.height) * 100}%`);
  };

  const baseText = { x: 600, y: 120, textAnchor: 'middle', dominantBaseline: 'middle' } as const;
  const baseStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 700,
    fontSize,
    letterSpacing: '-0.01em',
  } as const;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 220"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', userSelect: 'none', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => move(e.clientX, e.clientY)}
      onTouchStart={(e) => {
        setHovered(true);
        if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) move(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={() => setHovered(false)}
    >
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="25%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="75%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id={fid} x="-40%" y="-120%" width="180%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="b1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
          </feMerge>
        </filter>
        <radialGradient id={rid} ref={maskRef} gradientUnits="userSpaceOnUse" r="40%" cx="50%" cy="50%">
          <stop offset="0%" stopColor="white" />
          <stop offset="42%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={mid}>
          <rect x={0} y={0} width="100%" height="100%" fill={`url(#${rid})`} />
        </mask>
      </defs>
      {/* OUTER GLOW: blurred rainbow duplicate revealed through the cursor mask */}
      <text
        {...baseText}
        fill={`url(#${gid})`}
        stroke={`url(#${gid})`}
        strokeWidth={6}
        filter={`url(#${fid})`}
        mask={`url(#${mid})`}
        style={{ ...baseStyle, opacity: hovered ? 1 : 0, transition: 'opacity .5s ease' }}
      >
        {text}
      </text>
      {/* solid white fill */}
      <text {...baseText} fill="#fff" style={baseStyle}>
        {text}
      </text>
      {/* white stroke that draws in on load */}
      <text {...baseText} ref={animRef} fill="transparent" stroke="rgba(255,255,255,0.85)" strokeWidth={3} style={baseStyle}>
        {text}
      </text>
    </svg>
  );
}
