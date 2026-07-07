import { useState, type CSSProperties, type FormEvent } from 'react';
import { Modal } from '../ui/Modal';

interface NominationModalProps {
  open: boolean;
  onClose: () => void;
}

const labelStyle: CSSProperties = { color: 'rgba(46,40,32,0.5)', fontSize: '0.6rem' };

const fieldStyle: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  marginTop: 8,
  padding: '12px 14px',
  background: '#fff',
  border: '1px solid rgba(46,40,32,0.2)',
  borderRadius: 'var(--radius-house)',
  color: 'var(--ink-on-light)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
};

export function NominationModal({ open, onClose }: NominationModalProps) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSending(true);
    const fd = new FormData(e.currentTarget);
    const body = new URLSearchParams();
    fd.forEach((v, k) => {
      if (typeof v === 'string') body.set(k, v);
    });
    try {
      // Formspree form "Founder Nomination" — submissions email the account owner.
      const r = await fetch('https://formspree.io/f/xpqgnvpw', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          accept: 'application/json',
        },
        body: body.toString(),
      });
      if (r.ok) setSent(true);
      else setError('Something went wrong. Please try again.');
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setSending(false);
  };

  return (
    <Modal open={open} onClose={onClose} zIndex={80} maxWidth={540} label="Nominate a changemaker">
      {!sent ? (
        <form onSubmit={submit}>
          <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
            Step into the open seat
          </div>
          <h3 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '2rem', margin: '12px 0 0' }}>
            Nominate a changemaker.
          </h3>
          <p className="bd" style={{ color: 'rgba(46,40,32,0.7)', fontSize: '0.95rem', margin: '12px 0 22px' }}>
            Yourself, or someone whose presence this circle needs. We read every one.
          </p>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label className="eye" style={labelStyle}>
                Your name
                <input className="field-l" type="text" name="name" required style={fieldStyle} />
              </label>
            </div>
            <div>
              <label className="eye" style={labelStyle}>
                Email
                <input className="field-l" type="email" name="email" required style={fieldStyle} />
              </label>
            </div>
          </div>
          <div style={{ marginTop: 14 }}>
            <label className="eye" style={labelStyle}>
              Who you're nominating
              <input className="field-l" type="text" name="nominee" required style={fieldStyle} />
            </label>
          </div>
          <div style={{ marginTop: 14 }}>
            <label className="eye" style={labelStyle}>
              Why they belong at the fire
              <textarea className="field-l" rows={3} name="why" required style={{ ...fieldStyle, resize: 'vertical' }} />
            </label>
          </div>
          <button
            type="submit"
            className="eye ember"
            disabled={sending}
            style={{
              width: '100%',
              marginTop: 22,
              padding: 16,
              border: 'none',
              cursor: sending ? 'wait' : 'pointer',
              color: '#fff',
              background: 'var(--aniwa-terracotta)',
              borderRadius: 'var(--radius-house)',
              boxShadow: '0 12px 40px rgba(160,74,42,0.4), inset 0 1px 0 rgba(255,255,255,0.18)',
              opacity: sending ? 0.7 : 1,
            }}
          >
            {sending ? 'Sending…' : 'Send nomination →'}
          </button>
          {error && (
            <p className="bd" style={{ color: 'var(--aniwa-terracotta)', fontSize: '0.85rem', margin: '12px 0 0', textAlign: 'center' }}>
              {error}
            </p>
          )}
          <p className="bd" style={{ color: 'rgba(46,40,32,0.5)', fontSize: '0.78rem', margin: '14px 0 0', textAlign: 'center' }}>
            Reviewed within two weeks · summit@huyaaniwa.org
          </p>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '22px 8px' }}>
          <div style={{ fontSize: '2.2rem', color: 'var(--aniwa-terracotta)' }}>✦</div>
          <h3 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '2rem', margin: '14px 0 0' }}>
            Your nomination is received.
          </h3>
          <p className="myth" style={{ color: 'rgba(46,40,32,0.72)', fontSize: '1.2rem', margin: '14px auto 0', maxWidth: 380 }}>
            We read every one. If the fire calls them, they will hear from us.
          </p>
          <button
            onClick={onClose}
            className="eye ghost-l"
            style={{
              marginTop: 26,
              padding: '12px 30px',
              border: '1px solid rgba(46,40,32,0.3)',
              background: 'transparent',
              color: 'var(--ink-on-light)',
              borderRadius: 'var(--radius-house)',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      )}
    </Modal>
  );
}
