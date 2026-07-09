import { useState } from 'react';
import {
  fellowshipLeft,
  fellowshipRight,
  FELLOWSHIP_ROWS,
  helixPath,
  helixStrands,
  HELIX_UNIT,
  HELIX_WIDTH,
  HELIX_AMP,
  type FellowshipMember,
} from '../../lib/content';
import { Modal } from '../ui/Modal';

/* The Fellowship of Changemakers — light (bone) section. A unifying mission,
   then the two lineages down one vertical double helix: changemakers on the
   left strand, wisdom keepers on the right, one of each per row. The strands'
   growth is tip-tracked to scroll (drawWeave keeps the growing tip near
   mid-frame), and each seat fades in as the strand reaches its row
   ([data-helix-seat] carries the seat's fraction of the path). Every
   portrait opens a short-bio popup. */
export function Weaving() {
  const N = FELLOWSHIP_ROWS;
  const viewH = N * HELIX_UNIT;
  const [selected, setSelected] = useState<FellowshipMember | null>(null);

  const seat = (p: FellowshipMember, row: number, side: 'left' | 'right') => {
    const left = side === 'left' ? ((300 - HELIX_AMP) / HELIX_WIDTH) * 100 : ((300 + HELIX_AMP) / HELIX_WIDTH) * 100;
    const top = ((row + 0.5) / N) * 100;
    const frac = (row + 0.5) / N;
    return (
      <div
        key={p.name}
        className="helix-seat"
        data-helix-seat={frac.toFixed(4)}
        data-side={side}
        style={{
          position: 'absolute',
          left: `${left}%`,
          top: `${top}%`,
          transform: 'translate(-50%, -46%)',
          width: 'clamp(150px, 30vw, 250px)',
          textAlign: 'center',
          opacity: 0,
          transition: 'opacity 0.7s var(--ease-cinematic), transform 0.7s var(--ease-cinematic)',
        }}
      >
        <button
          type="button"
          className="helix-portrait-btn"
          onClick={() => setSelected(p)}
          aria-haspopup="dialog"
          aria-label={`About ${p.name}`}
          style={{
            display: 'block',
            width: 'clamp(104px, 24vw, 216px)',
            aspectRatio: '1',
            margin: '0 auto',
            padding: 0,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(160,74,42,0.5)',
            boxShadow: '0 14px 34px -12px rgba(46,40,32,0.4), 0 0 30px rgba(160,74,42,0.14)',
            background: '#EFE7D3',
            cursor: 'pointer',
          }}
        >
          <img
            src={p.img}
            alt={p.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.objectPosition, display: 'block' }}
          />
        </button>
        <div className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '1.12rem', fontWeight: 600, marginTop: 12, lineHeight: 1.2 }}>
          {p.name}
        </div>
        <div className="bd" style={{ color: 'rgba(46,40,32,0.62)', fontSize: '0.8rem', marginTop: 4, lineHeight: 1.3 }}>
          {p.role}
        </div>
      </div>
    );
  };

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
      <div data-reveal="" style={{ position: 'relative', zIndex: 2, textAlign: 'center', margin: '0 auto' }}>
        <h3 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: 'clamp(2.4rem, 5.2vw, 3.6rem)', margin: 0 }}>
          A Convergence of Changemakers
        </h3>
        <p className="bd" style={{ color: 'rgba(46,40,32,0.55)', fontSize: '0.9rem', margin: '14px 0 0', letterSpacing: '0.04em' }}>
          Meet the circle — select a portrait to learn more.
        </p>
      </div>

      <div
        className="helix-band"
        data-weave-band=""
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'min(880px, 96vw)',
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
              data-race={s.race}
              data-tip-source={s.tipIndex}
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

        {/* Comet heads: a glowing orb rides the growing tip of each core
            strand (positioned every frame by drawWeave via getPointAtLength). */}
        {[0, 1].map((idx) => (
          <div
            key={idx}
            data-helix-tip={idx}
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: 62,
              height: 62,
              margin: '-31px 0 0 -31px',
              pointerEvents: 'none',
              zIndex: 3,
              opacity: 0,
              transition: 'opacity 0.4s ease',
            }}
          >
            <div
              className="helix-tip-pulse"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background:
                  idx === 0
                    ? 'radial-gradient(circle, rgba(255,243,216,0.95) 0%, rgba(226,161,132,0.62) 16%, rgba(160,74,42,0.32) 40%, rgba(160,74,42,0) 68%)'
                    : 'radial-gradient(circle, rgba(255,248,226,0.95) 0%, rgba(222,190,138,0.62) 16%, rgba(184,148,92,0.32) 40%, rgba(184,148,92,0) 68%)',
              }}
            />
          </div>
        ))}

        {fellowshipLeft.map((p, row) => seat(p, row, 'left'))}
        {fellowshipRight.map((p, row) => seat(p, row, 'right'))}
      </div>

      <p
        data-reveal=""
        className="disp weaving-tagline"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.05em',
          lineHeight: 1.35,
          fontSize: 'clamp(1.5rem, 3.2vw, 2.5rem)',
          color: 'var(--ink-on-light)',
          margin: '90px auto 0',
          maxWidth: 940,
        }}
      >
        Two paradigms weaving a shared path towards{' '}
        <span style={{ color: 'var(--aniwa-terracotta)' }}>a regenerative future for all life.</span>
      </p>

      <Modal open={selected !== null} onClose={() => setSelected(null)} label={selected?.name ?? 'Fellowship member'} maxWidth={620} padding="40px">
        {selected && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
              <div
                style={{
                  width: 108,
                  height: 108,
                  flex: '0 0 auto',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(160,74,42,0.5)',
                  background: '#EFE7D3',
                }}
              >
                <img
                  src={selected.img}
                  alt={selected.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: selected.objectPosition, display: 'block' }}
                />
              </div>
              <div style={{ minWidth: 200, flex: '1 1 auto' }}>
                <h4 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '1.9rem', margin: 0, lineHeight: 1.1 }}>
                  {selected.name}
                </h4>
                <div className="eye" style={{ color: 'var(--aniwa-terracotta)', fontSize: '0.66rem', marginTop: 8 }}>
                  {selected.role}
                </div>
              </div>
            </div>
            <p className="bd" style={{ color: 'rgba(46,40,32,0.78)', fontSize: '0.98rem', lineHeight: 1.62, margin: '24px 0 0' }}>
              {selected.bio}
            </p>
          </div>
        )}
      </Modal>
    </section>
  );
}
