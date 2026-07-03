import { lazy, Suspense, type CSSProperties } from 'react';
import { HeroStrokeText } from './HeroStrokeText';

const CompassShader = lazy(() => import('./CompassShader'));

interface HeroProps {
  onLoginOpen: () => void;
}

const hairline: CSSProperties = {
  display: 'block',
  width: 28,
  height: 1.5,
  background: 'rgba(244,241,235,0.9)',
};

export function Hero({ onLoginOpen }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* WebGL compass shader — offset -80px so it reads behind the translucent nav */}
      <div style={{ position: 'absolute', top: -80, left: 0, right: 0, bottom: -80, zIndex: 0 }}>
        <Suspense fallback={null}>
          <CompassShader />
        </Suspense>
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'linear-gradient(180deg, rgba(21,19,42,0.45) 0%, rgba(21,19,42,0.18) 40%, rgba(21,19,42,0.72) 80%, #15132A 100%)',
          opacity: 0.445,
        }}
      />

      <nav
        aria-label="Main navigation"
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '25px 56px',
          background: 'rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <button
            aria-label="Menu"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 6,
              width: 28,
              height: 28,
              padding: 0,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <span style={hairline} />
            <span style={hairline} />
            <span style={{ ...hairline, width: 18 }} />
          </button>
        </div>
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="/assets/aniwa-logo.webp"
            alt="Aniwa"
            width={53}
            height={40}
            style={{ height: 40, width: 'auto', filter: 'brightness(2.2)' }}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button
            onClick={onLoginOpen}
            className="eye ember"
            style={{
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.66rem',
              background: 'var(--aniwa-terracotta)',
              padding: '11px 24px',
              borderRadius: 'var(--radius-house)',
              boxShadow: 'var(--shadow-ember)',
            }}
          >
            ATTENDEE LOGIN →
          </button>
        </div>
      </nav>

      <div
        style={{
          position: 'relative',
          zIndex: 4,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 0 46px',
          color: '#F4F1EB',
        }}
      >
        <img
          src="/assets/aniwa-wordmark.svg"
          alt="Aniwā"
          width={151}
          height={31}
          style={{ height: 31, width: 151, margin: '0 auto 14px' }}
        />
        <div style={{ display: 'block', width: 'min(864px, 74vw)', height: 120, margin: '4px auto' }}>
          <HeroStrokeText text="CONVERGENCE" />
        </div>
        <h1
          className="disp hero-title"
          style={{
            color: '#F4F1EB',
            fontSize: 70,
            margin: 0,
            whiteSpace: 'nowrap',
            marginTop: -28,
            fontWeight: 700,
            letterSpacing: '0.13em',
          }}
        >
          SUMMIT
        </h1>
        <div
          className="eye"
          style={{
            color: 'var(--aniwa-sand)',
            letterSpacing: '0.26em',
            fontSize: '1.34rem',
            marginTop: 10,
            fontFamily: "'Times New Roman', serif",
          }}
        >
          OCTOBER 23–25
        </div>
        <div className="eye" style={{ letterSpacing: '0.24em', fontSize: 13, marginTop: 18 }}>
          <b style={{ color: 'var(--aniwa-terracotta)', fontSize: 13 }}>An invite only event</b>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 14 }}>
          <a
            href="#invitation"
            className="eye ghost"
            style={{
              color: 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              padding: '15px 32px',
              border: '1px solid rgba(255,255,255,0.32)',
              borderRadius: 'var(--radius-house)',
            }}
          >
            ENTER INVITE CODE
          </a>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 4 }}>
        <div
          className="cue"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, color: 'rgba(255,255,255,0.5)' }}
        >
          <span className="eye" style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)' }}>
            SCROLL FOR MORE INFO
          </span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
