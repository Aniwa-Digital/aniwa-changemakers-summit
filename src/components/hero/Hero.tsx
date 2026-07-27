import { lazy, Suspense } from 'react';
import { HUYA_ANIWA_HEADER_LOGO_SRC, HUYA_ANIWA_MOBILE_MARK_SRC } from '../../lib/brand';
import { HeroStrokeText } from './HeroStrokeText';
import CompassOverlay from './CompassOverlay';

const CompassShader = lazy(() => import('./CompassShader'));

interface HeroProps {
  onInviteOpen: () => void;
}

export function Hero({ onInviteOpen }: HeroProps) {
  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--aniwa-cream)',
        overflow: 'hidden',
      }}
    >
      {/* Rainbow swirl (WebGL) + compass.svg line-art overlay */}
      <div
        className="hero-compass"
        style={{
          position: 'absolute',
          top: -80,
          left: 0,
          right: 0,
          bottom: -80,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          <CompassShader />
        </Suspense>
        <CompassOverlay
          src="/assets/compass/compass.svg"
          color="#9A6F42"
          opacity={0.5}
        />
      </div>

      <nav
        aria-label="Main navigation"
        className="hero-nav"
      >
        <div className="hero-nav__brand">
          <img
            src={HUYA_ANIWA_HEADER_LOGO_SRC}
            alt="Huya Aniwa Foundation"
            className="hero-nav__logo hero-nav__logo--desktop"
            width={88}
            height={44}
            fetchPriority="high"
            decoding="async"
          />
          <img
            src={HUYA_ANIWA_MOBILE_MARK_SRC}
            alt="Huya Aniwa Foundation"
            className="hero-nav__logo hero-nav__logo--mobile"
            width={417}
            height={303}
            decoding="async"
          />
        </div>
        <div className="hero-nav__actions">
          <button
            onClick={onInviteOpen}
            className="eye ember nav-login"
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
            INVITE CODE →
          </button>
        </div>
      </nav>

      <div
        className="hero-copy"
        style={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 0 46px',
          color: 'var(--ink-on-light)',
        }}
      >
        <div className="eye" style={{ color: 'var(--on-light-fg)', fontWeight: 500, letterSpacing: '0.24em', fontSize: '0.78rem' }}>
          HUYA ANIWA FOUNDATION
        </div>
        <div className="eye" style={{ color: 'var(--on-light-fg)', fontWeight: 500, letterSpacing: '0.24em', fontSize: '0.78rem', marginTop: 10 }}>
          PRESENTS
        </div>
        <div className="hero-stroke-wrap" style={{ display: 'block', width: 'min(864px, 74vw)', height: 120, margin: '18px auto 4px' }}>
          <HeroStrokeText text="CHANGEMAKERS" />
        </div>
        <h1
          className="disp hero-title"
          style={{
            color: 'var(--ink-on-light)',
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
        <div className="eye" style={{ color: 'var(--on-light-fg)', fontWeight: 700, letterSpacing: '0.24em', fontSize: '0.78rem', marginTop: 18 }}>
          OCTOBER 23–25, 2026
        </div>
        <div className="eye" style={{ color: 'var(--on-light-fg)', fontWeight: 700, letterSpacing: '0.24em', fontSize: '0.78rem', marginTop: 10 }}>
          SONOMA COUNTY, CALIFORNIA
        </div>
        <div className="eye" style={{ color: 'var(--on-light-fg)', fontWeight: 700, letterSpacing: '0.24em', fontSize: '0.78rem', marginTop: 16 }}>
          An invite-only convergence
        </div>
      </div>

    </section>
  );
}
