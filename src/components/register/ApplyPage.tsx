import { useState, type CSSProperties, type FormEvent } from 'react';
import { fnUrl } from '../../lib/functions';
import { BrandMark } from '../ui/BrandMark';

/* Application — for those called to the Summit without an invite code.
   Posts to the Netlify function `apply`, which stores in Blobs
   ("applications") and forwards to Netlify Forms ("applications") —
   same Hostinger→Netlify pattern as registration. */

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

export function ApplyPage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === 'string' && k !== 'form-name' && k !== 'bot-field') payload[k] = v.trim();
    });
    try {
      const r = await fetch(fnUrl('apply'), {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (r.ok) setSent(true);
      else {
        let msg = 'Something went wrong. Please try again.';
        try {
          const data = (await r.json()) as { error?: string };
          if (data.error) msg = data.error;
        } catch {
          /* keep default */
        }
        setError(msg);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setSending(false);
  };

  return (
    <section style={{ minHeight: '100vh', background: '#3A3128', padding: '60px 24px 120px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <a href="#" onClick={() => (window.location.hash = '')} style={{ display: 'inline-block', textDecoration: 'none' }}>
          <BrandMark logoHeight={30} />
        </a>
        <h1 className="disp" style={{ color: '#F4F1EB', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', margin: '26px 0 0', textTransform: 'uppercase' }}>
          A Call to Purpose
        </h1>
        <p className="bd" style={{ color: 'rgba(255,255,255,0.66)', fontSize: '1.02rem', margin: '20px 0 0', maxWidth: 560, lineHeight: 1.6 }}>
          Participation in the Aniwa Changemakers Summit is by invitation, curated to ensure deep alignment,
          integrity, and shared commitment. If you feel called to join this circle, tell us about yourself —
          a member of the team will reach out directly.
        </p>

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
            <p className="myth" style={{ color: '#F4F1EB', fontSize: '1.4rem', margin: 0, fontStyle: 'normal' }}>
              Thank you — your application has been received.
            </p>
            <p className="bd" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', margin: '14px 0 0' }}>
              A member of the team will be in touch if there is deep alignment.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ marginTop: 14 }}>
            <label style={labelStyle}>Name *</label>
            <input name="name" required style={field} autoComplete="name" />

            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div>
                <label style={labelStyle}>Email *</label>
                <input name="email" type="email" required style={field} autoComplete="email" />
              </div>
              <div>
                <label style={labelStyle}>LinkedIn</label>
                <input name="linkedin" style={field} placeholder="linkedin.com/in/…" />
              </div>
              <div>
                <label style={labelStyle}>Org / company name</label>
                <input name="organization" style={field} autoComplete="organization" />
              </div>
              <div>
                <label style={labelStyle}>Title</label>
                <input name="title" style={field} autoComplete="organization-title" />
              </div>
            </div>

            <label style={labelStyle}>Tell us about yourself. *</label>
            <textarea name="about" required rows={4} style={{ ...field, resize: 'vertical' }} />

            <label style={labelStyle}>Why would you like to join this Summit? *</label>
            <textarea name="whyJoin" required rows={4} style={{ ...field, resize: 'vertical' }} />

            <label style={labelStyle}>What do you feel you can contribute to the mission? *</label>
            <textarea name="contribution" required rows={4} style={{ ...field, resize: 'vertical' }} />

            <label style={labelStyle}>Are you prepared to contribute a five-figure tax-deductible donation? *</label>
            <select name="donationReady" required style={{ ...field, appearance: 'auto' as CSSProperties['appearance'] }} defaultValue="">
              <option value="" disabled>
                Select an answer…
              </option>
              {['Yes', 'No', 'I would like to discuss'].map((o) => (
                <option key={o} value={o} style={{ color: '#111' }}>
                  {o}
                </option>
              ))}
            </select>

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
              {sending ? 'Sending…' : 'Submit application →'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
