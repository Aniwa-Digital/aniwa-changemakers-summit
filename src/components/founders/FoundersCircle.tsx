import { useState } from 'react';
import { founders } from '../../lib/content';
import { NominationModal } from './NominationModal';

/* §04 The Founders Circle — bone section. 7 members + 1 dashed open seat on a
   polar ring; a terracotta spark ✦ at the exact ring center. The dark compass
   (opacity 0.15, brightness 0) is centered with NEGATIVE MARGINS so its
   ring-center (57% of its height) sits exactly on the spark, and its
   north-spear tip touches the section's top edge to meet the §03 connector.
   It spins with scroll (spinApplyCompass overwrites `transform` each frame).
   A second faint compass floats behind the whole section with parallax. */
export function FoundersCircle() {
  const [nomOpen, setNomOpen] = useState(false);

  return (
    <section
      id="apply"
      style={{
        position: 'relative',
        background: 'var(--aniwa-bone)',
        padding: '36px 40px 105px',
        overflow: 'hidden',
      }}
    >
      <div
        data-compass-wrap=""
        style={{
          position: 'absolute',
          left: '50%',
          top: '52%',
          width: 1000,
          height: 1000,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      >
        <img data-compass="" src="/assets/compass/compass.svg" alt="" style={{ width: '100%', height: '100%', opacity: 0.06 }} />
      </div>

      <div data-reveal="" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
        <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
          § 04 — Founders Circle
        </div>
        <h2 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '3.9rem', margin: '18px 0 0' }}>
          The Founders Circle
        </h2>
        <p
          className="bd"
          style={{
            color: 'rgba(34,31,56,0.72)',
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            lineHeight: 1.42,
            margin: '20px auto 0',
            maxWidth: 600,
          }}
        >
          The Founders empowering the summit
        </p>
      </div>

      <div data-reveal="" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 659, aspectRatio: '1', margin: '40px auto 0' }}>
        {founders.map((f, i) => (
          <div
            key={f.name ?? `open-${i}`}
            style={{ position: 'absolute', left: `${f.left}%`, top: `${f.top}%`, transform: 'translate(-50%, -50%)', zIndex: 2 }}
          >
            {f.open ? (
              <button
                onClick={() => setNomOpen(true)}
                className="open-seat"
                aria-label="Nominate a changemaker for the open seat"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 74,
                  height: 74,
                  borderRadius: '50%',
                  border: '1.5px dashed rgba(34,31,56,0.32)',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: 'var(--aniwa-terracotta)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.7rem',
                  lineHeight: 1,
                }}
              >
                +
              </button>
            ) : (
              <div className="founder-seat" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: 120 }}>
                <div
                  className="founder-portrait"
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid rgba(160,74,42,0.55)',
                    boxShadow: '0 10px 26px -12px rgba(160,74,42,0.55)',
                  }}
                >
                  <img src={f.img} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '0.95rem', marginTop: 11, lineHeight: 1.15 }}>
                  {f.name}
                </div>
                <div className="bd" style={{ color: 'rgba(34,31,56,0.55)', fontSize: '0.72rem', marginTop: 3, lineHeight: 1.25 }}>
                  {f.role}
                </div>
              </div>
            )}
          </div>
        ))}
        <img
          data-apply-compass=""
          src="/assets/compass/compass.svg"
          alt=""
          width={995}
          height={995}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 995,
            height: 995,
            maxWidth: 'none',
            marginLeft: -497,
            marginTop: -569,
            transformOrigin: '50% 57%',
            opacity: 0.15,
            filter: 'brightness(0)',
            pointerEvents: 'none',
            objectFit: 'contain',
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'var(--aniwa-terracotta)',
            fontFamily: 'var(--font-display)',
            fontSize: '2.6rem',
            lineHeight: 1,
            pointerEvents: 'none',
          }}
        >
          ✦
        </div>
      </div>

      <NominationModal open={nomOpen} onClose={() => setNomOpen(false)} />
    </section>
  );
}
