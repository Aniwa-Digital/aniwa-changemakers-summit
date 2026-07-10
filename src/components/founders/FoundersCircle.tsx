import { useEffect, useMemo, useState } from 'react';
import { placeFounders, type FounderSeat } from '../../lib/content';
import { FounderBioModal } from './FounderBioModal';
import { FoundersDraggableRing } from './FoundersDraggableRing';
import { NominationModal } from './NominationModal';

/* §04 The Founders Circle — bone section. Fifteen stewards on a polar ring with a
   terracotta spark ✦ at center. Desktop: static ring with names under each portrait.
   Mobile: draggable ring — portraits only, with name + title in a panel below. The
   dark compass spins with scroll on desktop (spinApplyCompass); on mobile it rotates
   with the drag ring instead. */
export function FoundersCircle() {
  const [nomOpen, setNomOpen] = useState(false);
  const [selected, setSelected] = useState<FounderSeat | null>(null);
  const [ringRadius, setRingRadius] = useState(42);
  const [useDraggableRing, setUseDraggableRing] = useState(false);

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 560px)');
    const medium = window.matchMedia('(max-width: 700px)');
    const draggable = window.matchMedia('(max-width: 700px)');

    const update = () => {
      if (narrow.matches) setRingRadius(46);
      else if (medium.matches) setRingRadius(44);
      else setRingRadius(42);
      setUseDraggableRing(draggable.matches);
    };
    update();
    narrow.addEventListener('change', update);
    medium.addEventListener('change', update);
    draggable.addEventListener('change', update);
    return () => {
      narrow.removeEventListener('change', update);
      medium.removeEventListener('change', update);
      draggable.removeEventListener('change', update);
    };
  }, []);

  const founders = useMemo(() => placeFounders(ringRadius), [ringRadius]);

  const portraitControl = (f: FounderSeat) => {
    const node = (
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
        <img src={f.img} alt={f.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
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

      {useDraggableRing ? (
        <FoundersDraggableRing founders={founders} />
      ) : (
        <div data-reveal="" className="founders-ring-wrap founders-ring-wrap--static" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 830, aspectRatio: '1', margin: '56px auto 0' }}>
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
            className="founders-spark"
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
      )}

      <NominationModal open={nomOpen} onClose={() => setNomOpen(false)} />
      <FounderBioModal founder={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
