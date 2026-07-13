import { lazy, Suspense } from 'react';
import { BrandMark } from '../ui/BrandMark';

const FireSphere = lazy(() => import('./FireSphere'));
const CompassOverlay = lazy(() => import('../hero/CompassOverlay'));

/* Closing — "Two paths. One fire. A new story." on council umber with a white
   compass and procedural fire at center. Footer strip below. */
export function Closing() {
  return (
    <section id="closing" style={{ position: 'relative' }}>
      <div
        className="closing-visual riso-grain-bg"
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
        <div
          className="closing-compass"
          style={{
            position: 'absolute',
            top: -100,
            left: 0,
            right: 0,
            bottom: -100,
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          <Suspense fallback={null}>
            <CompassOverlay scrollSpin={false} color="#F4F1EB" opacity={0.42} />
          </Suspense>
        </div>

        <div className="fire-orb">
          <Suspense fallback={null}>
            <FireSphere bloomStrength={2.7} bloomRadius={1.05} />
          </Suspense>
        </div>

        <div className="closing-copy" style={{ position: 'relative', zIndex: 4, padding: '0 24px', maxWidth: '37.71rem' }}>
          <h2 className="disp closing-title" style={{ color: '#F4F1EB', fontSize: '3.75rem', margin: 0 }}>
            Two paths. One fire.
            <br />
            A new story.
          </h2>
        </div>
      </div>

      <footer
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
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'normal',
            lineHeight: 1.3,
            color: 'rgba(244,241,235,0.75)',
            fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
            margin: '0 0 30px',
          }}
        >
          Shaping our future with wisdom
        </p>
        <div className="closing-contact" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <BrandMark logoHeight={34} word="Huya Aniwa" wordFont="display" />
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
