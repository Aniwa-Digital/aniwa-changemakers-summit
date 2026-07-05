import { fellowship, helixPath, helixStrands, HELIX_UNIT, HELIX_WIDTH, HELIX_AMP } from '../../lib/content';

/* The Fellowship of Changemakers — light (bone) section. A unifying mission,
   then every contributor down one vertical double helix. The strands' growth
   is tip-tracked to scroll (drawWeave keeps the growing tip near mid-frame),
   and each seat fades in as the strand reaches its row ([data-helix-seat]
   carries the seat's fraction of the path). */
export function Weaving() {
  const N = fellowship.length;
  const viewH = N * HELIX_UNIT;

  return (
    <section
      id="weaving"
      style={{
        position: 'relative',
        background: 'var(--aniwa-bone)',
        overflow: 'clip',
        padding: '110px 40px 96px',
      }}
    >
      <div data-reveal="" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
        <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
          A Unifying Mission
        </div>
        <h2 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '2.91rem', margin: '18px 0 0' }}>
          Today&rsquo;s leaders don&rsquo;t need another event.
          <br />
          We need the truths that will guide us.
        </h2>
        <p
          className="bd"
          style={{
            color: 'rgba(46,40,32,0.72)',
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            lineHeight: 1.42,
            margin: '20px auto 0',
            maxWidth: 680,
          }}
        >
          Calling forth 100 Planetary Leaders. Charting the map from an extractive paradigm of destruction to a
          regenerative destiny of mutual benefit. Weaving the Way forward together.
        </p>
      </div>

      <div data-reveal="" style={{ position: 'relative', zIndex: 2, textAlign: 'center', margin: '86px auto 0' }}>
        <h3 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '2.2rem', margin: 0 }}>
          The Fellowship of Changemakers
        </h3>
      </div>

      <div
        className="helix-band"
        data-weave-band=""
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'min(760px, 94vw)',
          aspectRatio: `${HELIX_WIDTH} / ${viewH}`,
          margin: '54px auto 0',
        }}
      >
        <svg
          viewBox={`0 0 ${HELIX_WIDTH} ${viewH}`}
          preserveAspectRatio="none"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
          aria-hidden="true"
        >
          <defs>
            <filter id="helixGlow" x="-40%" y="-8%" width="180%" height="116%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>
          {helixStrands.map((s, i) => (
            <path
              key={i}
              data-weave=""
              data-delay={s.delay}
              d={helixPath(N, s.startDir, s.amp)}
              fill="none"
              stroke={s.stroke}
              strokeWidth={s.width}
              strokeOpacity={s.opacity}
              pathLength={1}
              filter={s.glow ? 'url(#helixGlow)' : undefined}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          ))}
        </svg>

        {fellowship.map((p, i) => {
          const left = i % 2 === 0 ? ((300 - HELIX_AMP) / HELIX_WIDTH) * 100 : ((300 + HELIX_AMP) / HELIX_WIDTH) * 100;
          const top = ((i + 0.5) / N) * 100;
          const frac = (i + 0.5) / N;
          return (
            <div
              key={p.name}
              className="helix-seat"
              data-helix-seat={frac.toFixed(4)}
              style={{
                position: 'absolute',
                left: `${left}%`,
                top: `${top}%`,
                transform: 'translate(-50%, -46%)',
                width: 'clamp(120px, 24vw, 190px)',
                textAlign: 'center',
                opacity: 0,
                transition: 'opacity 0.7s var(--ease-cinematic), transform 0.7s var(--ease-cinematic)',
              }}
            >
              <div
                className="helix-portrait"
                style={{
                  width: 'clamp(96px, 19vw, 156px)',
                  aspectRatio: '1',
                  margin: '0 auto',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(160,74,42,0.5)',
                  boxShadow: '0 14px 34px -12px rgba(46,40,32,0.4), 0 0 30px rgba(160,74,42,0.14)',
                  background: '#EFE7D3',
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.objectPosition }}
                />
              </div>
              <div className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '1.05rem', fontWeight: 600, marginTop: 12, lineHeight: 1.2 }}>
                {p.name}
              </div>
              <div className="bd" style={{ color: 'rgba(46,40,32,0.62)', fontSize: '0.78rem', marginTop: 4, lineHeight: 1.3 }}>
                {p.role}
              </div>
            </div>
          );
        })}
      </div>

      <p
        data-reveal=""
        className="myth"
        style={{ position: 'relative', zIndex: 2, textAlign: 'center', fontSize: '1.9rem', color: 'var(--ink-on-light)', margin: '84px auto 0', maxWidth: 760 }}
      >
        Two paradigms weaving a shared path towards{' '}
        <span style={{ color: 'var(--aniwa-terracotta)' }}>a regenerative future for all life.</span>
      </p>
    </section>
  );
}
