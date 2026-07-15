import { lazy, Suspense } from 'react';

const CosmicScene = lazy(() => import('./CosmicScene'));

/* §00 The Prophecy — sticky cinematic. Prophecy copy cross-fades with scroll
   (driven by scroll-choreography's cineProgression). Sits on a beige field;
   the land photo fades in and the copy reads ink-on-light. After
   "THIS TIME HAS ARRIVED" the scene fades to dark, the cosmic starfield fades
   in, and — while that cosmic stage stays pinned — the "Calling forth 100
   Planetary Leaders" copy scrolls up into frame over it. */
export function Prophecy() {
  return (
    <section id="prophecy" style={{ position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <img
          data-cine-bg=""
          src="/assets/img/land.webp"
          sizes="100vw"
          loading="lazy"
          decoding="async"
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0,
            transformOrigin: 'center',
            willChange: 'opacity',
          }}
        />
        <div
          data-cine-scrim=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            opacity: 0,
            pointerEvents: 'none',
            background: 'rgba(255,255,255,0.25)',
          }}
        />

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
          <div className="prophecy-act__inner" style={{ maxWidth: 780 }}>
            <p className="myth" style={{ color: 'var(--ink-on-light)', fontSize: 'clamp(1.275rem, 3vw, 2.475rem)', lineHeight: 1.32 }}>
              For thousands of years,
              <br />
              The Original Peoples of the Earth
              <br />
              have foretold of an unprecedented{' '}
              <strong style={{ fontWeight: 600, color: 'var(--aniwa-gold)' }}>time.</strong>
            </p>
            <div className="cue" style={{ marginTop: 46, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
              <span className="eye" style={{ fontSize: '0.58rem', color: 'rgba(0,0,0,0.45)' }}>
                Scroll
              </span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.55)" strokeWidth="1.6" aria-hidden="true">
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
          <div className="prophecy-act__inner">
          <p
            className="myth"
            style={{
              color: 'var(--ink-on-light)',
              fontWeight: 600,
              fontSize: 'clamp(1.25rem, 2.6vw, 2.05rem)',
              lineHeight: 1.5,
              maxWidth: 780,
            }}
          >
            A time when the people of the North&nbsp;
            <br />
            <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '0.82em', fontWeight: 500 }}>
              — of mind, of structure, of technology
            </span>
            <br />
            would meet around the same fire as the people of the South&nbsp;
            <br />
            <span style={{ color: 'rgba(0,0,0,0.55)', fontSize: '0.82em', fontWeight: 500 }}>
              — of heart, of spirit, of land
            </span>
          </p>
          </div>
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
          <div className="prophecy-act__inner">
          <p
            className="myth"
            style={{
              color: 'var(--ink-on-light)',
              fontWeight: 500,
              fontSize: 'clamp(1.5rem, 2.9vw, 2.31rem)',
              lineHeight: 1.5,
              maxWidth: 780,
            }}
          >
            Converging the strengths of opposing paradigms
            <br />
            to weave a shared path forward{' '}
            <span style={{ color: 'var(--aniwa-gold)' }}>together</span>
          </p>
          </div>
        </div>

        <div
          data-cine-act="3"
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
          <div className="prophecy-act__inner">
          <h2
            className="disp"
            style={{
              color: 'var(--ink-on-light)',
              fontWeight: 400,
              letterSpacing: '0.06em',
              lineHeight: 1.04,
              fontSize: 'clamp(1.9rem, 3.6vw, 3rem)',
              margin: 0,
              marginTop: '6vh',
            }}
          >
            THIS TIME HAS <span style={{ color: 'var(--aniwa-gold)' }}>ARRIVED</span>
          </h2>
          </div>
        </div>

        {/* End-of-prophecy transition: after "THIS TIME HAS ARRIVED" the photo
            expands and the scene fades to solid dark. */}
        <div
          data-cine-dark=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            opacity: 0,
            pointerEvents: 'none',
            background: '#14100B',
          }}
        />

        {/* Cosmic starfield fades in over the darkness and stays pinned in this
            sticky stage while the copy below scrolls up over it. */}
        <div
          data-cine-cosmic=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            opacity: 0,
            pointerEvents: 'none',
            mixBlendMode: 'screen',
          }}
        >
          <Suspense fallback={null}>
            <CosmicScene />
          </Suspense>
        </div>

        {/* Outro: wash the cosmic/dark background back to bone; sits above the
            cosmos but below the copy so the text stays readable on top. */}
        <div
          data-cine-outro=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            opacity: 0,
            pointerEvents: 'none',
            background: 'var(--aniwa-bone)',
          }}
        />

        {/* "Calling forth" copy scrolls up into frame over the pinned cosmos. */}
        <div
          data-cine-act="4"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 40px',
            textAlign: 'center',
            opacity: 0,
            willChange: 'opacity, transform',
          }}
        >
          <div className="prophecy-act__inner" style={{ maxWidth: 880, margin: '0 auto' }}>
            <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
              A Unifying Mission
            </div>
            <h2
              className="disp"
              style={{
                color: 'var(--ink-on-light)',
                fontSize: '2.91rem',
                lineHeight: 1.14,
                margin: '18px 0 0',
              }}
            >
              Calling forth
              <br />
              100
              <br />
              Planetary Leaders
            </h2>
            <p
              className="bd"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--on-light-body)',
                fontSize: '0.98rem',
                lineHeight: 'var(--leading-body)',
                margin: '26px auto 0',
                maxWidth: 480,
              }}
            >
              At this pivotal moment in our history, we need the critical truths that will guide us.
              <br />
              <br />
              Charting the map from an extractive paradigm of destruction to a regenerative destiny of mutual benefit.
              <br />
              <br />
              Weaving the Way forward together.
            </p>
          </div>
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
          <span style={{ display: 'block', height: 1, width: 24, background: 'rgba(0,0,0,0.2)', transition: 'width .6s, background .6s' }} />
          <span style={{ display: 'block', height: 1, width: 24, background: 'rgba(0,0,0,0.2)', transition: 'width .6s, background .6s' }} />
          <span style={{ display: 'block', height: 1, width: 24, background: 'rgba(0,0,0,0.2)', transition: 'width .6s, background .6s' }} />
        </div>
      </div>
    </section>
  );
}
