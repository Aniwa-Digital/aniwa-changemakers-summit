import { badgeColors, partnerLogos, stats } from '../../lib/content';
import { useRosterSwap } from '../../hooks/useRosterSwap';

/* §02 The Room — bone section. Left rail: stats + partner-logo grid.
   Right: 3-col roster of 12 ink-wash portraits with a live builder swap
   (keeper slots hold the middle column). On desktop the roster's height is
   matched to the left rail each frame by matchRoomHeights(). */
export function Room() {
  const slots = useRosterSwap();

  return (
    <section id="room" style={{ position: 'relative', background: 'var(--aniwa-bone)', padding: '120px 40px 124px' }}>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto' }}>
        <div
          data-reveal=""
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24 }}
        >
          <div>
            <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
              § 02 — Contributors
            </div>
            <h2 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', margin: '16px 0 0' }}>
              Confirmed Contributors.
            </h2>
          </div>
          <a
            href="#apply"
            className="eye ghost-l"
            style={{
              textDecoration: 'none',
              padding: '15px 26px',
              border: '1px solid rgba(34,31,56,0.28)',
              borderRadius: 'var(--radius-house)',
              color: 'var(--ink-on-light)',
              whiteSpace: 'nowrap',
            }}
          >
            FULL LIST →
          </a>
        </div>

        <div
          className="grid-2"
          style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 56, alignItems: 'start', marginTop: 58 }}
        >
          <div data-reveal="">
            <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
              WITH SKILLSETS SPANNING
            </div>
            <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 34 }}>
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

            <div style={{ marginTop: 46 }}>
              <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
                WITH LEADERSHIP EXPERIENCE FROM&nbsp;
              </div>
              <div
                className="grid-logos"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '26px 16px',
                  marginTop: 24,
                  alignItems: 'center',
                  justifyItems: 'center',
                }}
              >
                {partnerLogos.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
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

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px 22px' }}>
            {slots.map((p, i) => {
              const colors = badgeColors[p.badge];
              return (
                <div data-reveal="" key={i} style={{ textAlign: 'left' }}>
                  <div style={{ transition: 'opacity 0.55s ease', opacity: p.op }}>
                    <div
                      style={{
                        position: 'relative',
                        aspectRatio: '4 / 5',
                        overflow: 'hidden',
                        borderRadius: 'var(--radius-house)',
                        background: '#EFE7D3',
                        border: '1px solid rgba(34,31,56,0.1)',
                      }}
                    >
                      <img
                        src={p.img}
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 28%' }}
                      />
                      <span
                        className="tag"
                        style={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          padding: '5px 9px',
                          borderRadius: 'var(--radius-house)',
                          color: colors.fg,
                          background: colors.bg,
                        }}
                      >
                        {p.badge}
                      </span>
                    </div>
                    <div className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '1.12rem', marginTop: 13 }}>
                      {p.name}
                    </div>
                    <div className="bd" style={{ color: 'rgba(34,31,56,0.6)', fontSize: '0.85rem', marginTop: 3 }}>
                      {p.role}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
