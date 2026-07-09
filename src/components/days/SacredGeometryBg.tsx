export function SacredGeometryBg() {
  return (
    <svg
      className="elements-geometry"
      viewBox="0 0 1000 1000"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="geoFade" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="rgba(244,241,235,0.16)" />
          <stop offset="55%" stopColor="rgba(244,241,235,0.08)" />
          <stop offset="100%" stopColor="rgba(244,241,235,0.0)" />
        </radialGradient>
      </defs>

      {/* soft field */}
      <circle cx="500" cy="520" r="420" fill="url(#geoFade)" />

      {/* key points (diamond) */}
      <g fill="none" stroke="rgba(244,241,235,0.12)" strokeWidth="1">
        <circle cx="500" cy="170" r="16" />
        <circle cx="275" cy="520" r="16" />
        <circle cx="725" cy="520" r="16" />
        <circle cx="500" cy="870" r="16" />

        {/* connecting lines */}
        <path d="M500 170 L275 520 L500 870 L725 520 Z" />
        <path d="M500 170 L725 520" />
        <path d="M275 520 L725 520" />
        <path d="M500 170 L500 870" />

        {/* concentric circles */}
        <circle cx="500" cy="520" r="150" />
        <circle cx="500" cy="520" r="260" />
        <circle cx="500" cy="520" r="360" />

        {/* vesica-style overlaps */}
        <circle cx="500" cy="520" r="260" />
        <circle cx="500" cy="360" r="260" />
        <circle cx="500" cy="680" r="260" />
      </g>

      {/* ember accent */}
      <g fill="none" stroke="rgba(160,74,42,0.22)" strokeWidth="1.25">
        <circle cx="500" cy="520" r="260" />
        <path d="M500 170 L500 870" />
        <path d="M275 520 L725 520" />
      </g>
    </svg>
  );
}

