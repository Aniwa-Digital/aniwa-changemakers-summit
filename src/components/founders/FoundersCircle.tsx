import { useEffect, useMemo, useState } from 'react';
import { placeFounders } from '../../lib/content';
import { FoundersDraggableRing } from './FoundersDraggableRing';

/* §04 The Founders Circle — bone section. Fifteen stewards on a polar ring with a
   terracotta spark ✦ at center. Same interactive ring on all breakpoints: portraits
   only on the circle, name + bio in the panel below, Vivien starts at the bottom. */
export function FoundersCircle() {
  const [ringRadius, setRingRadius] = useState(42);

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 560px)');
    const medium = window.matchMedia('(max-width: 700px)');

    const update = () => {
      if (narrow.matches) setRingRadius(46);
      else if (medium.matches) setRingRadius(44);
      else setRingRadius(43);
    };
    update();
    narrow.addEventListener('change', update);
    medium.addEventListener('change', update);
    return () => {
      narrow.removeEventListener('change', update);
      medium.removeEventListener('change', update);
    };
  }, []);

  const founders = useMemo(() => placeFounders(ringRadius), [ringRadius]);

  return (
    <section
      id="apply"
      style={{
        position: 'relative',
        background: 'var(--aniwa-bone)',
        padding: '64px 40px 105px',
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

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 820, margin: '0 auto' }}>
        <h2 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '3.9rem', margin: 0 }}>
          The Founders Circle
        </h2>
        <p
          className="bd"
          style={{
            color: 'rgba(46,40,32,0.72)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.05rem, 2.8vw, 1.25rem)',
            lineHeight: 1.42,
            margin: '20px auto 0',
            maxWidth: 700,
          }}
        >
          The Founders Circle is an intimate circle of Stewards who make the Summit possible — collaborators whose
          contributions, reach, and vision carry our convergence from vision to reality, and whose stewardship sustains
          the Huya Aniwa Foundation&rsquo;s impact.
        </p>
      </div>

      <FoundersDraggableRing founders={founders} />
    </section>
  );
}
