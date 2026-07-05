import { partnerLogos, stats } from '../../lib/content';

/* The Room — bone section, now a standalone band: the Fellowship's collective
   skillsets (stats) and the organizations their leadership experience spans
   (partner logos). The people themselves live on the helix above. */
export function Room() {
  return (
    <section id="room" style={{ position: 'relative', background: 'var(--aniwa-bone)', padding: '110px 40px 116px' }}>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto' }}>
        <div data-reveal="">
          <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
            WITH SKILLSETS SPANNING
          </div>
          <div
            className="grid-stats"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '38px 32px',
              marginTop: 34,
            }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="disp" style={{ color: 'var(--aniwa-terracotta)', fontSize: '3rem', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div className="eye" style={{ color: 'var(--ink-on-light)', marginTop: 8 }}>
                  {s.label}
                </div>
                <p className="bd" style={{ color: 'rgba(34,31,56,0.6)', fontSize: '0.85rem', margin: '6px 0 0' }}>
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal="" style={{ marginTop: 78 }}>
          <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
            WITH LEADERSHIP EXPERIENCE FROM&nbsp;
          </div>
          <div
            className="grid-logos"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '34px 28px',
              marginTop: 34,
              alignItems: 'center',
              justifyItems: 'center',
            }}
          >
            {partnerLogos.map((logo) => (
              <img
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                loading="lazy"
                style={{
                  height: logo.large ? 68 : 34,
                  width: '100%',
                  maxWidth: logo.large ? 184 : 92,
                  objectFit: 'contain',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
