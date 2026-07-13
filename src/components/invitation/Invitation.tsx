import { PurposePath } from './PurposePath';

interface InvitationProps {
  onInviteOpen: () => void;
}

/* Invitation — "A Call to Purpose" with the five-step river path. Invite-code
   entry lives in the header modal (InviteCodeModal). */
export function Invitation({ onInviteOpen }: InvitationProps) {
  return (
    <section
      id="reciprocity"
      className="riso-grain-bg"
      style={{ position: 'relative', padding: '88px 40px 118px', overflow: 'clip' }}
    >
      <div id="invitation" style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto' }}>
        <div className="invitation-intro" style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto' }}>
          <h2 className="disp" style={{ color: '#F4F1EB', fontSize: 'clamp(2.8rem, 6vw, 5rem)', margin: 0, textTransform: 'uppercase' }}>
            A Call to Purpose
          </h2>
          <p
            className="myth"
            style={{
              color: 'rgba(255,255,255,0.68)',
              fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)',
              margin: '38px auto 0',
              maxWidth: '46rem',
              fontStyle: 'normal',
            }}
          >
            Participation in the Aniwa Changemakers Summit&mdash;whether as an attendee, speaker, or member of the
            Founders Circle&mdash;is by invitation, curated to ensure deep alignment, integrity, and shared commitment.
          </p>
          <div className="invitation-actions" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14, marginTop: 32 }}>
            <a
              href="#/apply"
              className="eye ember"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '14px 28px',
                color: '#fff',
                background: 'var(--aniwa-terracotta)',
                borderRadius: 'var(--radius-house)',
                textDecoration: 'none',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                boxShadow: 'var(--shadow-ember)',
              }}
            >
              Apply for Invite
            </a>
            <button
              type="button"
              onClick={onInviteOpen}
              className="eye ghost"
              style={{
                padding: '14px 28px',
                color: '#fff',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.42)',
                borderRadius: 'var(--radius-house)',
                cursor: 'pointer',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
              }}
            >
              Enter Invite Code
            </button>
          </div>
        </div>

        <div className="invitation-path-wrap" style={{ marginTop: 74 }}>
          <PurposePath />
        </div>
      </div>
    </section>
  );
}
