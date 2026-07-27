const BG = '#DDD2C0';
const GLOW_SIZE = 'min(58vmin, 520px)';
const CORE_SIZE = 'min(38vmin, 340px)';

export function DuneOrbsBg() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: BG }} aria-hidden="true">
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          background: `radial-gradient(
            circle at 50% 50%,
            rgba(255, 248, 237, 0.95) 0%,
            rgba(255, 232, 168, 0.82) 12%,
            rgba(255, 184, 107, 0.68) 22%,
            rgba(240, 137, 74, 0.55) 32%,
            rgba(232, 122, 157, 0.42) 42%,
            rgba(201, 138, 232, 0.3) 52%,
            rgba(138, 184, 232, 0.2) 60%,
            rgba(221, 210, 192, 0.1) 72%,
            rgba(221, 210, 192, 0.04) 82%,
            transparent 92%
          )`,
          filter: 'blur(8px)',
        }}
      />

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: CORE_SIZE,
          height: CORE_SIZE,
          background: `radial-gradient(
            circle at 50% 50%,
            rgba(255, 245, 232, 0.92) 0%,
            rgba(255, 210, 150, 0.65) 28%,
            rgba(245, 150, 110, 0.42) 48%,
            rgba(230, 130, 160, 0.24) 62%,
            transparent 80%
          )`,
          filter: 'blur(12px)',
        }}
      />

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ width: GLOW_SIZE, height: GLOW_SIZE }}
      >
        <div
          className="absolute inset-[18%] rounded-full opacity-60 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 200, 120, 0.55) 0%, rgba(240, 120, 150, 0.38) 40%, rgba(180, 150, 230, 0.22) 58%, transparent 75%)',
          }}
        />
      </div>
    </div>
  );
}
