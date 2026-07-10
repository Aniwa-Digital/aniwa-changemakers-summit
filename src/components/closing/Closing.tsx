import { lazy, Suspense } from 'react';
import { BrandMark } from '../ui/BrandMark';

const FireSphere = lazy(() => import('./FireSphere'));

/* Closing — "Two paths. One fire. A new story." over the compass and the
   procedural fire orb (opaque render, screen-blended by its wrapper), with
   the Aniwa contact block in its own footer strip BELOW the visual, and the
   compass-design credit as the final footnote. */
export function Closing() {
  return (
    <section id="closing" style={{ position: 'relative' }}>
      <div
        className="closing-visual"
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
          loading="lazy"
          decoding="async"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #251F19 0%, #17110CEB)' }} />
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
        <div data-reveal="" className="closing-copy" style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: '37.71rem' }}>
          <h2 className="disp closing-title" style={{ color: '#fff', fontSize: '3.75rem', margin: 0 }}>
            Two paths. One fire.
            <br />
            A new story.
          </h2>
        </div>
      </div>

      <footer
        data-reveal=""
        style={{
          position: 'relative',
          zIndex: 2,
          background: '#1B1611',
          textAlign: 'center',
          padding: '44px 24px calc(36px + env(safe-area-inset-bottom))',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <p
          className="myth"
          style={{ color: 'rgba(244,241,235,0.75)', fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)', margin: '0 0 30px' }}
        >
          Where the Earth and the future meet.
        </p>
        <div className="closing-contact" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <BrandMark />
          <span className="eye" style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: 'var(--tracking-wide)', fontSize: '0.64rem' }}>
            summit@huyaaniwa.org
          </span>
        </div>
        <div className="eye" style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.6rem', marginTop: 16 }}>
          A nonprofit initiative of Aniwa &amp; the Huya Aniwa Foundation
        </div>
        <div className="eye" style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.6rem', marginTop: 24 }}>
          Compass design by Dante Orpilla from the book,{' '}
          <a
            href="https://www.amazon.com/Which-Way-North-Creative-Marketers/dp/1637744064"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--aniwa-terracotta)', textDecoration: 'none', whiteSpace: 'nowrap', borderBottom: '1px solid rgba(160,74,42,0.45)' }}
          >
            Which Way Is North
          </a>{' '}
          by Will Cady
        </div>
      </footer>
    </section>
  );
}
