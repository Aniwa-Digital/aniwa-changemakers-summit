import { weaveNodes, weaveStrands } from '../../lib/content';

/* §01 The Weaving — 200vh pinned. Six SVG strands draw with scroll
   (stroke-dash, driven by drawWeave); the faint compass behind the band spins
   exactly one full clockwise turn by the time the weave completes at 85% of
   the pin. Eight portrait nodes alternate Builder / Keeper along the band. */
export function Weaving() {
  return (
    <section
      id="weaving"
      style={{
        position: 'relative',
        height: '200vh',
        background: 'linear-gradient(125deg, #15132A 0%, #1C1834 48%, #2A2138 100%)',
        overflow: 'clip',
      }}
    >
      <div
        data-weave-pin=""
        style={{
          position: 'sticky',
          top: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 40px',
          overflow: 'clip',
        }}
      >
        <div data-reveal="" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
          <div className="eye" style={{ color: 'var(--aniwa-gold)' }}>
            § 01 — Convergence
          </div>
          <h2 className="disp" style={{ color: '#F4F1EB', fontSize: '2.91rem', margin: '18px 0 0' }}>
            Protectors of our past.&nbsp; Forgers of our future.&nbsp;
          </h2>
          <p
            className="bd"
            style={{
              color: 'rgba(255,255,255,0.74)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              lineHeight: 1.42,
              margin: '20px auto 0',
              maxWidth: 620,
            }}
          >
            The sharpest builders of the future and the deepest keepers of ancestral wisdom, woven into one line. Not two
            camps. One fire.
          </p>
        </div>

        <div
          className="weave-band-desktop"
          data-reveal=""
          data-weave-band=""
          style={{
            position: 'relative',
            zIndex: 2,
            width: 'min(1300px, 100%)',
            aspectRatio: '1300 / 640',
            margin: '-23px auto 0',
          }}
        >
          <div
            data-compass-wrap=""
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 721,
              height: 1013,
              transform: 'translate(-50%, -57%)',
              pointerEvents: 'none',
            }}
          >
            <img
              data-weave-compass=""
              src="/assets/compass/compass.svg"
              alt=""
              width={721}
              height={1013}
              style={{ width: '100%', height: '100%', opacity: 0.08, transformOrigin: '50% 57%' }}
            />
          </div>

          <svg
            viewBox="0 0 1300 600"
            preserveAspectRatio="none"
            style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '93.75%', pointerEvents: 'none', overflow: 'visible' }}
            aria-hidden="true"
          >
            <defs>
              <filter id="weaveGlow" x="-15%" y="-40%" width="130%" height="180%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            {weaveStrands.map((s, i) => (
              <path
                key={i}
                data-weave=""
                data-delay={s.delay}
                d={s.d}
                fill="none"
                stroke={s.stroke}
                strokeWidth={s.width}
                strokeOpacity={s.opacity}
                pathLength={1}
                filter={s.glow ? 'url(#weaveGlow)' : undefined}
                style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
              />
            ))}
          </svg>

          <div
            className="eye"
            style={{
              position: 'absolute',
              left: -2,
              top: '44.7%',
              fontSize: '0.58rem',
              color: 'rgba(255,255,255,0.4)',
              transform: 'rotate(-90deg)',
              transformOrigin: 'left center',
            }}
          >
            Extraction
          </div>
          <div
            className="eye"
            style={{
              position: 'absolute',
              right: -6,
              top: '50%',
              fontSize: '0.58rem',
              color: 'var(--aniwa-terracotta)',
              transform: 'rotate(90deg)',
              transformOrigin: 'right center',
            }}
          >
            Regeneration
          </div>

          {weaveNodes.map((n) => (
            <div key={n.name} style={{ position: 'absolute', left: `${n.left}%`, top: `${n.top}%`, width: '7.385%', textAlign: 'center' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.22)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={n.img}
                  alt={n.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: n.objectPosition }}
                />
              </div>
              <div className="bd" style={{ color: '#F4F1EB', fontSize: '0.7rem', fontWeight: 600, marginTop: 8, whiteSpace: 'nowrap' }}>
                {n.name}
              </div>
              <div className="tag" style={{ color: n.badge === 'Builder' ? '#C77A52' : '#9DBE8F', marginTop: 3 }}>
                {n.badge}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-only vertical weave: the same six strands transposed to run
            down the page — builders hold the left rail, keepers the right.
            Hidden ≥701px; drawWeave animates whichever band is on stage. */}
        <div className="weave-vertical" data-weave-band="" data-reveal="" style={{ position: 'relative', zIndex: 2 }}>
          <div
            className="eye"
            style={{ position: 'absolute', top: -44, left: '24%', transform: 'translateX(-50%)', color: '#C77A52', fontSize: '0.6rem' }}
          >
            Builders
          </div>
          <div
            className="eye"
            style={{ position: 'absolute', top: -44, left: '76%', transform: 'translateX(-50%)', color: '#9DBE8F', fontSize: '0.6rem' }}
          >
            Keepers
          </div>
          <svg
            viewBox="0 0 600 1300"
            preserveAspectRatio="none"
            style={{ position: 'absolute', left: '3.125%', top: 0, width: '93.75%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}
            aria-hidden="true"
          >
            <defs>
              <filter id="weaveGlowV" x="-40%" y="-15%" width="180%" height="130%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            {/* matrix(0,1,1,0,0,0) transposes (x,y) → (y,x): the horizontal
                1300×600 strand paths render vertically in a 600×1300 box */}
            <g transform="matrix(0, 1, 1, 0, 0, 0)">
              {weaveStrands.map((s, i) => (
                <path
                  key={i}
                  data-weave=""
                  data-delay={s.delay}
                  d={s.d}
                  fill="none"
                  stroke={s.stroke}
                  strokeWidth={s.width}
                  strokeOpacity={s.opacity}
                  pathLength={1}
                  filter={s.glow ? 'url(#weaveGlowV)' : undefined}
                  style={{ strokeDasharray: 1, strokeDashoffset: 0 }}
                />
              ))}
            </g>
          </svg>
          {weaveNodes.map((n) => (
            <div
              key={n.name}
              style={{
                position: 'absolute',
                left: n.badge === 'Builder' ? '24%' : '76%',
                top: `${n.left}%`,
                transform: 'translate(-50%, -50%)',
                width: 104,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  margin: '0 auto',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.22)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
              >
                <img
                  src={n.img}
                  alt={n.name}
                  loading="lazy"
                  width={54}
                  height={54}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: n.objectPosition }}
                />
              </div>
              <div className="bd" style={{ color: '#F4F1EB', fontSize: '0.64rem', fontWeight: 600, marginTop: 6, lineHeight: 1.25 }}>
                {n.name}
              </div>
              <div className="tag" style={{ color: n.badge === 'Builder' ? '#C77A52' : '#9DBE8F', marginTop: 3 }}>
                {n.badge}
              </div>
            </div>
          ))}
        </div>

        <p
          data-reveal=""
          className="myth"
          style={{ position: 'relative', zIndex: 2, textAlign: 'center', fontSize: '1.9rem', color: '#F4F1EB', margin: '30px auto 0', maxWidth: 760 }}
        >
          A gathering of the best of both.
          <br />
          Two paradigms weaving one path towards <span style={{ color: 'var(--aniwa-terracotta)' }}>a regenerative future.</span>
        </p>
      </div>
    </section>
  );
}
