import { useState } from 'react';
import { founders, type FounderSeat } from '../../lib/content';
import { Modal } from '../ui/Modal';
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
  const [selected, setSelected] = useState<FounderSeat | null>(null);

  const portraitControl = (f: FounderSeat, className = 'founder-portrait') => {
    const node = (
      <div
        className={className}
        style={
          className.includes('founders-mobile-portrait')
            ? undefined
            : {
                width: 82,
                height: 82,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid rgba(160,74,42,0.55)',
                boxShadow: '0 10px 26px -12px rgba(160,74,42,0.55)',
              }
        }
      >
        <img src={f.img} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
    );

    if (f.bio) {
      return (
        <button
          type="button"
          onClick={() => setSelected(f)}
          aria-haspopup="dialog"
          aria-label={`About ${f.name}`}
          style={{ display: 'block', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: '50%' }}
        >
          {node}
        </button>
      );
    }

    if (f.linkedin) {
      return (
        <a href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${f.name} — profile`} style={{ display: 'block', borderRadius: '50%' }}>
          {node}
        </a>
      );
    }

    return node;
  };

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
        <h2 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '3.9rem', margin: 0 }}>
          The Founders Circle
        </h2>
        <p
          className="bd"
          style={{
            color: 'rgba(46,40,32,0.72)',
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            lineHeight: 1.42,
            margin: '20px auto 0',
            maxWidth: 700,
          }}
        >
          The Founders Circle is the intimate circle of stewards who make the Summit possible — collaborators whose
          contributions, reach, and vision carry the gathering from calling to reality, and whose stewardship sustains
          the Huya Aniwa Foundation&rsquo;s work beyond it. The Founders convene the fire; the Fellowship gathers
          around it.
        </p>
      </div>

      <div data-reveal="" className="founders-ring-wrap" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 830, aspectRatio: '1', margin: '40px auto 0' }}>
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
                  border: '1.5px dashed rgba(46,40,32,0.32)',
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
                {portraitControl(f)}
                <div className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '0.95rem', marginTop: 11, lineHeight: 1.15 }}>
                  {f.name}
                </div>
                <div className="bd" style={{ color: 'rgba(46,40,32,0.55)', fontSize: '0.72rem', marginTop: 3, lineHeight: 1.25 }}>
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

      <div data-reveal="" className="founders-mobile-grid">
        {founders.map((f, i) =>
          f.open ? (
            <button
              key={`open-mobile-${i}`}
              onClick={() => setNomOpen(true)}
              className="founders-mobile-seat open-seat"
              aria-label="Nominate a changemaker for the open seat"
              type="button"
            >
              <span className="founders-mobile-open">+</span>
              <span className="disp founders-mobile-name">Open seat</span>
            </button>
          ) : (
            <div key={f.name} className="founders-mobile-seat">
              {portraitControl(f, 'founder-portrait founders-mobile-portrait')}
              <div className="disp founders-mobile-name">{f.name}</div>
              <div className="bd founders-mobile-role">{f.role}</div>
            </div>
          ),
        )}
      </div>

      <NominationModal open={nomOpen} onClose={() => setNomOpen(false)} />

      <Modal open={selected !== null} onClose={() => setSelected(null)} label={selected?.name ?? 'Founder'} maxWidth={620} padding="40px">
        {selected?.bio && (
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
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
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
