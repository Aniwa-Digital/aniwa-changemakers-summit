import { lazy, Suspense } from 'react';
import { HeroStrokeText } from './HeroStrokeText';

const CompassShader = lazy(() => import('./CompassShader'));
const CompassOverlay = lazy(() => import('./CompassOverlay'));

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
      {/* Compass-sized glow orb behind the compass */}
      <div
        aria-hidden="true"
        className="compass-orb"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* Lift the center so overlaps never read as a dark shadow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'min(46vmin, 380px)',
            height: 'min(46vmin, 380px)',
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            filter: 'blur(44px)',
            opacity: 0.55,
            mixBlendMode: 'screen',
            background: 'radial-gradient(circle, rgba(255,250,244,0.95) 0%, rgba(255,250,244,0.35) 42%, transparent 72%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'min(64vmin, 520px)',
            height: 'min(64vmin, 520px)',
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            filter: 'blur(34px)',
            opacity: 0.74,
            mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #FFD9A0 0%, #F0894A 55%, transparent 78%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'min(54vmin, 440px)',
            height: 'min(54vmin, 440px)',
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            filter: 'blur(40px)',
            opacity: 0.62,
            mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #F0894A 0%, #E8709A 55%, transparent 78%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: '56%',
            width: 'min(48vmin, 390px)',
            height: 'min(48vmin, 390px)',
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            filter: 'blur(46px)',
            opacity: 0.46,
            mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #E8709A 0%, #C868A0 55%, transparent 78%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '56%',
            left: '50%',
            width: 'min(44vmin, 360px)',
            height: 'min(44vmin, 360px)',
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            filter: 'blur(52px)',
            opacity: 0.40,
            mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #C868A0 0%, #9C7FC7 55%, transparent 78%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '54%',
            left: '44%',
            width: 'min(40vmin, 320px)',
            height: 'min(40vmin, 320px)',
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            filter: 'blur(56px)',
            opacity: 0.32,
            mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #9C7FC7 0%, #7FA0C7 60%, transparent 78%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '50%',
            width: 'min(50vmin, 410px)',
            height: 'min(50vmin, 410px)',
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            filter: 'blur(44px)',
            opacity: 0.42,
            mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #D9622E 0%, #B84A22 60%, transparent 78%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '46%',
            width: 'min(42vmin, 340px)',
            height: 'min(42vmin, 340px)',
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            filter: 'blur(46px)',
            opacity: 0.36,
            mixBlendMode: 'screen',
            background: 'radial-gradient(circle, #FFE0B8 0%, #FFD9A0 50%, transparent 75%)',
          }}
        />
        {/* Soft full-spectrum rainbow core — gently warmed toward orange */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 'min(40vmin, 330px)',
            height: 'min(40vmin, 330px)',
            transform: 'translate(-50%, -50%)',
            borderRadius: 9999,
            filter: 'blur(42px)',
            opacity: 0.54,
            background:
              'radial-gradient(circle, #E8B878 0%, #D07058 22%, #6898B0 48%, #70A8B0 70%, #9888B0 92%, transparent 100%)',
          }}
        />
      </div>

      {/* WebGL compass + rainbow — behind hero text */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          left: 0,
          right: 0,
          bottom: -80,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          <CompassShader />
          <CompassOverlay />
        </Suspense>
      </div>

      <nav
        aria-label="Main navigation"
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '25px 56px',
          background: 'transparent',
        }}
      >
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <img
            src="/assets/aniwa-logo.webp"
            alt="Aniwa"
            width={80}
            height={60}
            fetchPriority="high"
            decoding="async"
            style={{ height: 60, width: 'auto' }}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
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
