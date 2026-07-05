import { useState, type FormEvent } from 'react';
import { steps } from '../../lib/content';

/* Invitation — purple section. "Entry is the first ceremony." + the 6-step
   process and the invite-code card. The code is validated server-side; a
   valid one opens the gated registration page. */
export function Invitation() {
  const [code, setCode] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');

  const register = async (e: FormEvent) => {
    e.preventDefault();
    const c = code.trim();
    if (!c || checking) return;
    setChecking(true);
    setError('');
    try {
      const r = await fetch('/.netlify/functions/validate-code', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code: c }),
      });
      const d = (await r.json()) as { valid: boolean; redeemed: boolean };
      if (d.valid) {
        window.location.hash = `#/register?code=${encodeURIComponent(c.toUpperCase())}`;
      } else {
        setError(d.redeemed ? 'That invite code has already been used.' : 'That invite code isn’t valid. Check it and try again.');
      }
    } catch {
      setError('We couldn’t verify your code just now. Please try again.');
    }
    setChecking(false);
  };

  return (
    <section id="reciprocity" style={{ position: 'relative', background: '#3A3128', padding: '55px 40px 118px', overflow: 'hidden' }}>
      <div id="invitation" style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto' }}>
        <div data-reveal="">
          <h2 className="disp" style={{ color: '#F4F1EB', fontSize: 'clamp(2.8rem, 6vw, 5rem)', margin: 0 }}>
            Entry is the first ceremony.
          </h2>
          <p className="myth" style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)', margin: '38px 0 0', maxWidth: '42rem' }}>
            Participation in the Summit as an attendee, or in the Fellowship as a Speaker, or in the Founders Circle
            as a collaborator, is based on alignment, integrity, and capacity. If you feel called to join us, we look
            forward to hearing from you.
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
            className="invite-card"
            style={{
              minWidth: 0,
              background: 'rgba(35,29,23,0.55)',
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

            <form onSubmit={(e) => void register(e)} className="invite-form" style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <input
                  className="field"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Your 6-character code"
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
                  disabled={checking}
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
                  {checking ? 'Checking…' : 'Register →'}
                </button>
              </form>
            {error && (
              <p className="bd" style={{ color: '#E2A184', fontSize: '0.9rem', margin: '14px 0 0' }}>
                {error}
              </p>
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
