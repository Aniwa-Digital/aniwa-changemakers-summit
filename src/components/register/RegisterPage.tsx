import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';

/* Registration — gated behind a valid, unredeemed invite code. On submit the
   info is stored and forwarded to the team, who reach out directly. */

const INDUSTRIES = [
  'Technology & AI',
  'Finance & Investment',
  'Media & Entertainment',
  'Indigenous Leadership & Culture',
  'Philanthropy & Nonprofit',
  'Health & Wellness',
  'Science & Academia',
  'Arts & Design',
  'Government & Policy',
  'Land & Regenerative Agriculture',
  'Other',
];

const field: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '14px 16px',
  background: 'rgba(35,29,23,0.55)',
  border: '1px solid rgba(255,255,255,0.24)',
  borderRadius: 'var(--radius-house)',
  color: '#fff',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
};

const labelStyle: CSSProperties = {
  display: 'block',
  color: 'rgba(244,241,235,0.72)',
  fontSize: '0.7rem',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  margin: '22px 0 8px',
  fontFamily: 'var(--font-sans)',
};

function readCodeFromHash(): string {
  const q = window.location.hash.split('?')[1] ?? '';
  return new URLSearchParams(q).get('code') ?? '';
}

export function RegisterPage() {
  const [code, setCode] = useState(readCodeFromHash);
  const [gate, setGate] = useState<'checking' | 'open' | 'closed'>(code ? 'checking' : 'closed');
  const [gateMsg, setGateMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [publicDirectory, setPublicDirectory] = useState(false);

  const checkCode = async (c: string) => {
    setGate('checking');
    setGateMsg('');
    try {
      const r = await fetch('/.netlify/functions/validate-code', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code: c }),
      });
      const d = (await r.json()) as { valid: boolean; redeemed: boolean };
      if (d.valid) {
        setGate('open');
      } else {
        setGate('closed');
        setGateMsg(d.redeemed ? 'That invite code has already been used.' : c ? 'That invite code isn’t valid.' : '');
      }
    } catch {
      setGate('closed');
      setGateMsg('We couldn’t verify your code just now. Please try again.');
    }
  };

  useEffect(() => {
    if (code) void checkCode(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const body: Record<string, unknown> = { code, publicDirectory };
    fd.forEach((v, k) => {
      if (typeof v === 'string') body[k] = v;
    });
    try {
      const r = await fetch('/.netlify/functions/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = (await r.json()) as { ok?: boolean; error?: string };
      if (d.ok) setSent(true);
      else setError(d.error ?? 'Something went wrong. Please try again.');
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setSending(false);
  };

  return (
    <section style={{ minHeight: '100vh', background: '#3A3128', padding: '60px 24px 120px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <a href="#" onClick={() => (window.location.hash = '')} style={{ textDecoration: 'none' }}>
          <img src="/assets/aniwa-logo.webp" alt="Aniwa" width={40} height={30} style={{ height: 30, width: 'auto', filter: 'brightness(2.2)' }} />
        </a>
        <h1 className="disp" style={{ color: '#F4F1EB', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', margin: '26px 0 0' }}>
          Registration
        </h1>

        {sent ? (
          <div
            style={{
              marginTop: 40,
              padding: '28px 30px',
              background: 'rgba(184,148,92,0.1)',
              border: '1px solid rgba(184,148,92,0.4)',
              borderRadius: 'var(--radius-house)',
            }}
          >
            <p className="myth" style={{ color: '#F4F1EB', fontSize: '1.4rem', margin: 0 }}>
              Thank you — your registration has been received.
            </p>
            <p className="bd" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', margin: '14px 0 0' }}>
              A member of the team will reach out to you directly. We will see you at the fire.
            </p>
          </div>
        ) : gate !== 'open' ? (
          <div style={{ marginTop: 34 }}>
            <p className="bd" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.05rem', maxWidth: 520 }}>
              Registration is by invitation. Enter your invite code to begin.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void checkCode(code);
              }}
              className="invite-form"
              style={{ display: 'flex', gap: 12, marginTop: 20, maxWidth: 480 }}
            >
              <input
                style={{ ...field, letterSpacing: '0.14em', textTransform: 'uppercase' }}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Your 6-character code"
                aria-label="Invite code"
              />
              <button
                type="submit"
                disabled={gate === 'checking'}
                className="eye ember"
                style={{
                  padding: '14px 22px',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fff',
                  background: 'var(--aniwa-terracotta)',
                  borderRadius: 'var(--radius-house)',
                  whiteSpace: 'nowrap',
                }}
              >
                {gate === 'checking' ? 'Checking…' : 'Continue →'}
              </button>
            </form>
            {gateMsg && (
              <p className="bd" style={{ color: '#E2A184', fontSize: '0.95rem', marginTop: 14 }}>
                {gateMsg}
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={submit} style={{ marginTop: 10 }}>
            <p className="bd" style={{ color: 'rgba(255,255,255,0.66)', fontSize: '1rem', margin: '18px 0 0' }}>
              Invite code <b style={{ color: 'var(--aniwa-gold)', letterSpacing: '0.08em' }}>{code.toUpperCase()}</b> accepted.
              Tell us how to reach you — a member of the team will follow up directly.
            </p>

            <label style={labelStyle}>Full name *</label>
            <input name="fullName" required style={field} autoComplete="name" />

            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <label style={labelStyle}>Email *</label>
                <input name="email" type="email" required style={field} autoComplete="email" />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input name="phone" type="tel" style={field} autoComplete="tel" />
              </div>
              <div>
                <label style={labelStyle}>Organization</label>
                <input name="organization" style={field} autoComplete="organization" />
              </div>
              <div>
                <label style={labelStyle}>Role / title</label>
                <input name="role" style={field} autoComplete="organization-title" />
              </div>
            </div>

            <label style={labelStyle}>City & country</label>
            <input name="location" style={field} />

            <label style={labelStyle}>Industry</label>
            <select name="industry" style={{ ...field, appearance: 'auto' as CSSProperties['appearance'] }} defaultValue="">
              <option value="" disabled>
                Select your industry…
              </option>
              {INDUSTRIES.map((i) => (
                <option key={i} value={i} style={{ color: '#111' }}>
                  {i}
                </option>
              ))}
            </select>

            <label style={labelStyle}>Areas of expertise</label>
            <textarea
              name="expertise"
              rows={3}
              style={{ ...field, resize: 'vertical' }}
              placeholder="What you carry — skills, practice, lineage, work…"
            />

            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <label style={labelStyle}>LinkedIn</label>
                <input name="linkedin" style={field} placeholder="linkedin.com/in/…" />
              </div>
              <div>
                <label style={labelStyle}>Instagram</label>
                <input name="instagram" style={field} placeholder="@handle" />
              </div>
              <div>
                <label style={labelStyle}>X / Twitter</label>
                <input name="x" style={field} placeholder="@handle" />
              </div>
              <div>
                <label style={labelStyle}>Website</label>
                <input name="website" style={field} placeholder="https://…" />
              </div>
            </div>

            {/* Public directory toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={publicDirectory}
              onClick={() => setPublicDirectory((v) => !v)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginTop: 32,
                padding: '18px 20px',
                width: '100%',
                textAlign: 'left',
                background: 'rgba(35,29,23,0.55)',
                border: `1px solid ${publicDirectory ? 'rgba(184,148,92,0.55)' : 'rgba(255,255,255,0.18)'}`,
                borderRadius: 'var(--radius-house)',
                cursor: 'pointer',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: '0 0 auto',
                  width: 46,
                  height: 26,
                  borderRadius: 13,
                  position: 'relative',
                  background: publicDirectory ? 'var(--aniwa-terracotta)' : 'rgba(255,255,255,0.18)',
                  transition: 'background 0.25s',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 3,
                    left: publicDirectory ? 23 : 3,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#F4F1EB',
                    transition: 'left 0.25s',
                  }}
                />
              </span>
              <span>
                <span className="bd" style={{ display: 'block', color: '#F4F1EB', fontSize: '0.95rem' }}>
                  Include me in the public directory
                </span>
                <span className="bd" style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', marginTop: 4 }}>
                  Show my name, role, and links in the Summit’s public participant directory.
                </span>
              </span>
            </button>

            {error && (
              <p className="bd" style={{ color: '#E2A184', fontSize: '0.95rem', marginTop: 18 }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="eye ember"
              style={{
                marginTop: 34,
                padding: '16px 40px',
                border: 'none',
                cursor: 'pointer',
                color: '#fff',
                background: 'var(--aniwa-terracotta)',
                borderRadius: 'var(--radius-house)',
                boxShadow: 'var(--shadow-ember)',
                fontSize: '0.8rem',
              }}
            >
              {sending ? 'Sending…' : 'Send →'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
