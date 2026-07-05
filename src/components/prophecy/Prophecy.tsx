import { lazy, Suspense } from 'react';

const CosmicScene = lazy(() => import('./CosmicScene'));

/* §00 The Prophecy — 300vh sticky cinematic. Three acts of serif-italic
   prophecy copy cross-fade with scroll (driven by scroll-choreography's
   cineProgression). The three.js starfield/beam renders opaque black inside a
   mix-blend-mode:screen wrapper so only light adds over the photo. */
export function Prophecy() {
  return (
    <section id="prophecy" style={{ position: 'relative', height: '300vh', background: '#1A1830' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <img
          data-cine-bg=""
          src="/assets/img/hero-patagonia-clean.jpg"
          srcSet="/assets/img/hero-patagonia-clean-760.jpg 760w, /assets/img/hero-patagonia-clean.jpg 1264w"
          sizes="100vw"
          width={1264}
          height={848}
          loading="lazy"
          decoding="async"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.5,
            transformOrigin: 'center',
            willChange: 'transform',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 55%, transparent 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.9) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '66%',
            background: 'linear-gradient(to top, rgba(26,24,48,0.9) 0%, rgba(26,24,48,0.2) 50%, transparent 100%)',
          }}
        />
        <div
          data-cine-ember=""
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '50%',
            pointerEvents: 'none',
            opacity: 0,
            background:
              'radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--aniwa-terracotta) 45%, transparent), transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.06,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
            mixBlendMode: 'overlay',
          }}
        />

        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', mixBlendMode: 'screen' }}>
          <Suspense fallback={null}>
            <CosmicScene />
          </Suspense>
        </div>

        <div
          data-cine-act="0"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ maxWidth: 780 }}>
            <p className="myth" style={{ color: '#F4F1EB', fontSize: 'clamp(1.275rem, 3vw, 2.475rem)', lineHeight: 1.32 }}>
              For thousands of years,
              <br />
              The Original Peoples of the Earth
              <br />
              have foretold of an unprecedented{' '}
              <strong style={{ fontWeight: 600, color: 'var(--aniwa-gold)' }}>time.</strong>
            </p>
            <div className="cue" style={{ marginTop: 46, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
              <span className="eye" style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.4)' }}>
                Scroll
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <div
          data-cine-act="1"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            textAlign: 'center',
            opacity: 0,
          }}
        >
          <p
            className="myth"
            style={{
              color: '#fff',
              fontWeight: 600,
              fontSize: 'clamp(1.25rem, 2.6vw, 2.05rem)',
              lineHeight: 1.5,
              maxWidth: 780,
              textShadow: '0 0 40px rgba(255,255,255,0.32)',
            }}
          >
            A time when the people of the North&nbsp;
            <br />
            <span style={{ color: 'rgba(255,255,255,0.72)' }}>— of mind, of structure, of technology —</span>
            <br />
            would meet around the same fire as the people of the South&nbsp;
            <br />
            <span style={{ color: 'rgba(255,255,255,0.72)' }}>— of heart, of spirit, of land —</span>
          </p>
        </div>

        <div
          data-cine-act="2"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            textAlign: 'center',
            opacity: 0,
          }}
        >
          <p
            className="myth"
            style={{
              color: '#F4F1EB',
              fontWeight: 500,
              fontSize: 'clamp(1.5rem, 2.9vw, 2.31rem)',
              lineHeight: 1.5,
              maxWidth: 780,
              textShadow: '0 0 40px rgba(255,255,255,0.32)',
            }}
          >
            Converging the strengths of opposing paradigms
            <br />
            to weave a shared path forward together.
          </p>
        </div>

        <div
          data-cine-act="3"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 26,
            padding: '0 24px',
            textAlign: 'center',
            opacity: 0,
          }}
        >
          <svg
            width="44"
            height="66"
            viewBox="0 0 44 66"
            fill="none"
            aria-hidden="true"
            style={{ filter: 'drop-shadow(0 0 18px rgba(184,148,92,0.85)) drop-shadow(0 0 44px rgba(184,148,92,0.4))' }}
          >
            <path d="M27 2 L7 38 L19 38 L14 64 L37 26 L24 26 Z" fill="var(--aniwa-gold)" />
          </svg>
          <h2
            className="disp"
            style={{
              color: '#F4F1EB',
              fontWeight: 400,
              letterSpacing: '0.06em',
              lineHeight: 1.04,
              fontSize: 'clamp(1.9rem, 3.6vw, 3rem)',
              textShadow: '0 0 30px rgba(184,148,92,0.55), 0 0 60px rgba(184,148,92,0.28)',
              margin: 0,
            }}
          >
            THIS TIME HAS ARRIVED
          </h2>
        </div>

        <div
          data-cine-marker=""
          style={{
            position: 'absolute',
            zIndex: 2,
            bottom: 26,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ display: 'block', height: 1, width: 40, background: 'rgba(160,74,42,0.8)', transition: 'width .6s, background .6s' }} />
          <span style={{ display: 'block', height: 1, width: 24, background: 'rgba(255,255,255,0.2)', transition: 'width .6s, background .6s' }} />
          <span style={{ display: 'block', height: 1, width: 24, background: 'rgba(255,255,255,0.2)', transition: 'width .6s, background .6s' }} />
          <span style={{ display: 'block', height: 1, width: 24, background: 'rgba(255,255,255,0.2)', transition: 'width .6s, background .6s' }} />
        </div>
      </div>
    </section>
  );
}
