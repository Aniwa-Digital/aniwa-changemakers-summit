import { useState, type FormEvent } from 'react';
import { steps } from '../../lib/content';

/* §05 Invitation — purple section. "Entry is the first ceremony." + the
   6-step numbered process and the invite-code card (code → registered state). */
export function Invitation() {
  const [code, setCode] = useState('');
  const [registered, setRegistered] = useState(false);

  const register = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim()) setRegistered(true);
  };

  return (
    <section id="reciprocity" style={{ position: 'relative', background: '#2D2A47', padding: '55px 40px 118px', overflow: 'hidden' }}>
      <div id="invitation" style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto' }}>
        <div data-reveal="">
          <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
            § 05 — Invitation
          </div>
          <h2 className="disp" style={{ color: '#F4F1EB', fontSize: 'clamp(2.8rem, 6vw, 5rem)', margin: '20px 0 0' }}>
            Entry is the first ceremony.
          </h2>
          <p className="myth" style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)', margin: '38px 0 0', maxWidth: '39.19rem' }}>
            Selection is not based on capital. It is based on alignment, maturity, and what you bring to the fire.
          </p>
        </div>

        <div
          className="grid-2"
          data-reveal=""
          style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'start', marginTop: 74 }}
        >
          <div style={{ minWidth: 0 }}>
            {steps.map((step) => (
              <div
                key={step.n}
                style={{ display: 'flex', alignItems: 'baseline', gap: 34, padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.13)' }}
              >
                <span
                  className="disp"
                  style={{ color: 'var(--aniwa-terracotta)', fontSize: '1.35rem', fontFeatureSettings: "'onum' 1", minWidth: 34 }}
                >
                  {step.n}
                </span>
                <span className="disp" style={{ color: '#F4F1EB', fontSize: '1.6rem', fontWeight: 400 }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              minWidth: 0,
              background: 'rgba(20,18,40,0.55)',
              border: '1px solid rgba(255,255,255,0.13)',
              borderRadius: 'var(--radius-house)',
              padding: 40,
            }}
          >
            <h3 className="disp" style={{ color: '#F4F1EB', fontSize: '2rem', margin: 0 }}>
              Received an invite code?
            </h3>
            <p className="bd" style={{ color: 'rgba(255,255,255,0.62)', fontSize: '1rem', margin: '16px 0 0' }}>
              Enter it below to begin your registration process. Once complete, resources, locations, and other summit
              essentials can be found in your participant portal.
            </p>

            {!registered ? (
              <form onSubmit={register} style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <input
                  className="field"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. ANIWA-2026"
                  aria-label="Invite code"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    boxSizing: 'border-box',
                    padding: '15px 16px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.24)',
                    borderRadius: 'var(--radius-house)',
                    color: '#fff',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                  }}
                />
                <button
                  type="submit"
                  className="eye ember"
                  style={{
                    padding: '15px 22px',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#fff',
                    background: 'var(--aniwa-terracotta)',
                    borderRadius: 'var(--radius-house)',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 12px 40px rgba(160,74,42,0.45), inset 0 1px 0 rgba(255,255,255,0.18)',
                  }}
                >
                  Register →
                </button>
              </form>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  marginTop: 28,
                  padding: '20px 22px',
                  background: 'rgba(184,148,92,0.1)',
                  border: '1px solid rgba(184,148,92,0.4)',
                  borderRadius: 'var(--radius-house)',
                }}
              >
                <span style={{ color: 'var(--aniwa-gold)', fontSize: '1.1rem', lineHeight: 1 }}>✦</span>
                <p className="bd" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.94rem', margin: 0 }}>
                  Code received. We'll email your registration link within a day. We will see you at the fire.
                </p>
              </div>
            )}

            <p className="bd" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.94rem', margin: '26px 0 0' }}>
              No code yet?{' '}
              <a href="#apply" style={{ color: 'var(--aniwa-terracotta)', textDecoration: 'none' }}>
                Request an invitation →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
