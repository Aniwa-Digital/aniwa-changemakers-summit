import { useState, type CSSProperties, type FormEvent } from 'react';
import { fnUrl } from '../../lib/functions';

type ValidateResponse = {
  valid: boolean;
  redeemed: boolean;
  fullName?: string;
};

const fieldBase: CSSProperties = {
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
};

type InviteCodeFormProps = {
  variant?: 'hero' | 'card' | 'modal';
};

export function InviteCodeForm({ variant = 'card' }: InviteCodeFormProps) {
  const [code, setCode] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const c = code.trim();
    if (!c || checking) return;
    setChecking(true);
    setError('');
    try {
      const r = await fetch(fnUrl('validate-code'), {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code: c }),
      });
      const d = (await r.json()) as ValidateResponse;
      if (d.valid || d.redeemed) {
        window.location.hash = `#/register?code=${encodeURIComponent(c.toUpperCase())}`;
      } else {
        setError('That invite code isn’t valid. Check it and try again.');
      }
    } catch {
      setError('We couldn’t verify your code just now. Please try again.');
    }
    setChecking(false);
  };

  const isHero = variant === 'hero';
  const isModal = variant === 'modal';

  return (
    <div className={isHero ? 'invite-form-hero' : undefined}>
      <form
        onSubmit={(e) => void submit(e)}
        className="invite-form"
        style={{ display: 'flex', gap: 12, marginTop: isHero ? 0 : 28 }}
      >
        <input
          className="field"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Your 6-character code"
          aria-label="Invite code"
          style={{
            ...fieldBase,
            flex: 1,
            minWidth: 0,
            ...(isModal
              ? {
                  background: '#fff',
                  border: '1px solid rgba(46,40,32,0.2)',
                  color: 'var(--ink-on-light)',
                  letterSpacing: '0.08em',
                }
              : isHero
                ? { background: 'rgba(35,29,23,0.45)' }
                : {}),
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
            boxShadow: isHero || isModal ? 'var(--shadow-ember)' : '0 12px 40px rgba(160,74,42,0.45), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
        >
          {checking ? 'Checking…' : 'Register →'}
        </button>
      </form>
      {error && (
        <p className="bd" style={{ color: isModal ? 'var(--aniwa-ember)' : '#E2A184', fontSize: '0.9rem', margin: '14px 0 0' }}>
          {error}
        </p>
      )}
    </div>
  );
}
