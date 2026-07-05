import { lazy, Suspense } from 'react';

const FireSphere = lazy(() => import('./FireSphere'));

/* §08 Closing — "We will see you at the fire." over a faint compass and the
   procedural fire orb (opaque render, screen-blended by its wrapper). */
export function Closing() {
  return (
    <section
      id="closing"
      style={{
        position: 'relative',
        minHeight: '72vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <img
        src="/assets/img/day4-fire.jpg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #131125 0%, #000000EB)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -57%)', zIndex: 1, pointerEvents: 'none' }}>
        <img
          src="/assets/compass/compass.svg"
          alt=""
          style={{ display: 'block', height: 760, width: 'auto', maxWidth: 'none', opacity: 0.14, transformOrigin: '50% 57%' }}
        />
      </div>
      <div
        className="fire-orb"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(560px, 92vw)',
          aspectRatio: '1',
          zIndex: 1,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      >
        <Suspense fallback={null}>
          <FireSphere bloomStrength={2.7} bloomRadius={1.05} />
        </Suspense>
      </div>
      <footer data-reveal="" style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: '37.71rem' }}>
        <h2 className="disp closing-title" style={{ color: '#fff', fontSize: '3.75rem', margin: 0 }}>
          We will see you
          <br />
          at the fire.
        </h2>
        <div className="closing-contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 13, marginTop: 46 }}>
          <img src="/assets/aniwa-logo.webp" alt="Aniwa" width={34} height={26} style={{ height: 26, width: 'auto', filter: 'brightness(2.2)' }} />
          <span className="eye" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 'var(--tracking-wide)', fontSize: '0.64rem' }}>
            ANIWĀ · summit@huyaaniwa.org
          </span>
        </div>
        <div className="eye" style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.6rem', marginTop: 18 }}>
          A nonprofit initiative of Aniwa &amp; the Huya Aniwa Foundation
        </div>
      </footer>
    </section>
  );
}
