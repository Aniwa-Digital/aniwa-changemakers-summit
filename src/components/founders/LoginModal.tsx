import type { CSSProperties } from 'react';
import { Modal } from '../ui/Modal';

export type LoginProvider = 'Google' | 'Facebook' | 'Apple';

interface LoginModalProps {
  open: boolean;
  provider: LoginProvider | null;
  onClose: () => void;
  onProvider: (p: LoginProvider) => void;
}

const socialBtnStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 12,
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px 16px',
  background: '#fff',
  border: '1px solid rgba(34,31,56,0.18)',
  borderRadius: 'var(--radius-house)',
  color: 'var(--ink-on-light)',
  fontSize: '0.9rem',
  fontWeight: 500,
  cursor: 'pointer',
};

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07z" />
    </svg>
  );
}

function AppleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#111" d="M16.365 1.43c0 1.14-.417 2.204-1.11 3.005-.836.96-2.2 1.71-3.363 1.617-.14-1.11.42-2.29 1.09-3.02.75-.82 2.06-1.44 3.2-1.5.03.3.03.6-.017.9zM20.5 17.06c-.55 1.27-.82 1.84-1.53 2.96-.99 1.56-2.38 3.5-4.1 3.51-1.53.02-1.92-.99-3.99-.98-2.07.01-2.5 1-4.03.97-1.72-.02-3.04-1.77-4.03-3.33C.14 16.87-.06 12.2 1.6 9.62c1.18-1.83 3.04-2.9 4.79-2.9 1.78 0 2.9 1 4.37 1 1.43 0 2.3-1 4.36-1 1.56 0 3.21.85 4.39 2.32-3.86 2.11-3.23 7.62.99 9.02z" />
    </svg>
  );
}

/* Attendee login. Prototype-only auth: choosing a provider swaps to the
   welcome state — wire to real OAuth in production. */
export function LoginModal({ open, provider, onClose, onProvider }: LoginModalProps) {
  return (
    <Modal open={open} onClose={onClose} zIndex={90} maxWidth={430} padding="46px 42px 40px" label="Attendee login">
      {!provider ? (
        <>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
              Attendee access
            </div>
            <h3 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '2rem', margin: '12px 0 0' }}>
              Return to the fire.
            </h3>
            <p className="bd" style={{ color: 'rgba(34,31,56,0.7)', fontSize: '0.95rem', margin: '11px 0 0' }}>
              Sign in to your attendee portal.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => onProvider('Google')} className="social-btn bd" style={socialBtnStyle}>
              <GoogleMark />
              Continue with Google
            </button>
            <button onClick={() => onProvider('Facebook')} className="social-btn bd" style={socialBtnStyle}>
              <FacebookMark />
              Continue with Facebook
            </button>
            <button onClick={() => onProvider('Apple')} className="social-btn bd" style={socialBtnStyle}>
              <AppleMark />
              Continue with Apple
            </button>
          </div>
          <p className="bd" style={{ color: 'rgba(34,31,56,0.5)', fontSize: '0.78rem', margin: '24px 0 0', textAlign: 'center' }}>
            Access by invitation only · summit@huyaaniwa.org
          </p>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '16px 4px' }}>
          <div style={{ fontSize: '2.2rem', color: 'var(--aniwa-terracotta)' }}>✦</div>
          <h3 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '2rem', margin: '14px 0 0' }}>
            Welcome back.
          </h3>
          <p className="myth" style={{ color: 'rgba(34,31,56,0.72)', fontSize: '1.2rem', margin: '14px auto 0', maxWidth: 320 }}>
            Signing you in with {provider} — one moment at the threshold.
          </p>
          <button
            onClick={onClose}
            className="eye ghost-l"
            style={{
              marginTop: 26,
              padding: '12px 30px',
              border: '1px solid rgba(34,31,56,0.3)',
              background: 'transparent',
              color: 'var(--ink-on-light)',
              borderRadius: 'var(--radius-house)',
              cursor: 'pointer',
            }}
          >
            Enter
          </button>
        </div>
      )}
    </Modal>
  );
}
