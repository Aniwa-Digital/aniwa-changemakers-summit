import { lazy, Suspense } from 'react';

const FireSphere = lazy(() => import('./FireSphere'));

/* Closing — "We will see you at the fire." over the compass and the
   procedural fire orb (opaque render, screen-blended by its wrapper), with
   the Aniwa contact block in its own footer strip BELOW the visual, and the
   compass-design credit as the final footnote. */
export function Closing() {
  return (
    <section id="closing" style={{ position: 'relative' }}>
      <div
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
        <div data-reveal="" style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: '37.71rem' }}>
          <h2 className="disp closing-title" style={{ color: '#fff', fontSize: '3.75rem', margin: 0 }}>
            We will see you
            <br />
            at the fire.
          </h2>
          <p
            className="myth"
            style={{ color: 'rgba(244,241,235,0.72)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', margin: '22px 0 0' }}
          >
            Where the Earth and the future meet.
          </p>
        </div>
      </div>

      <footer
        data-reveal=""
        style={{
          position: 'relative',
          zIndex: 2,
          background: '#000',
          textAlign: 'center',
          padding: '44px 24px calc(36px + env(safe-area-inset-bottom))',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="closing-contact" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 13 }}>
          <img src="/assets/aniwa-logo.webp" alt="Aniwa" width={34} height={26} style={{ height: 26, width: 'auto', filter: 'brightness(2.2)' }} />
          <span className="eye" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 'var(--tracking-wide)', fontSize: '0.64rem' }}>
            ANIWĀ · summit@huyaaniwa.org
          </span>
        </div>
        <div className="eye" style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.6rem', marginTop: 16 }}>
          A nonprofit initiative of Aniwa &amp; the Huya Aniwa Foundation
        </div>
        <div className="bd" style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.68rem', marginTop: 22, fontStyle: 'italic' }}>
          Compass design by Dante Orpilla from the book, <span style={{ whiteSpace: 'nowrap' }}>Which Way Is North</span> by Will Cady
        </div>
      </footer>
    </section>
  );
}
