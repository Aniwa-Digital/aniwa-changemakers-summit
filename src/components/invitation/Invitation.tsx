import { steps } from '../../lib/content';
import { InviteCodeForm } from './InviteCodeForm';

/* Invitation — purple section. "Entry is the first ceremony." + the 6-step
   process and the invite-code card. The code is validated server-side; a
   valid or redeemed one opens the gated registration page. */
export function Invitation() {
  return (
    <section id="reciprocity" style={{ position: 'relative', background: '#3A3128', padding: '55px 40px 118px', overflow: 'hidden' }}>
      <div id="invitation" style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto' }}>
        <div className="invitation-mobile-code" data-reveal="">
          <h3 className="disp" style={{ color: '#F4F1EB', fontSize: '1.5rem', margin: 0 }}>
            Enter your invite code
          </h3>
          <InviteCodeForm />
        </div>

        <div data-reveal="">
          <h2 className="disp" style={{ color: '#F4F1EB', fontSize: 'clamp(2.8rem, 6vw, 5rem)', margin: 0, textTransform: 'uppercase' }}>
            A Call to Purpose
          </h2>
          <p className="myth" style={{ color: 'rgba(255,255,255,0.68)', fontSize: 'clamp(1.25rem, 2.2vw, 1.5rem)', margin: '38px 0 0', maxWidth: '46rem' }}>
            Participation in the Aniwa Changemakers Summit&mdash;whether as an attendee, speaker, or member of the
            Founders Circle&mdash;is by invitation, curated to ensure deep alignment, integrity, and shared commitment.
            If you feel called to join this circle but do not have an invite code, we welcome you to{' '}
            <a href="#/apply" style={{ color: 'var(--aniwa-terracotta)', textDecoration: 'none', borderBottom: '1px solid rgba(160,74,42,0.5)' }}>
              fill out an application form
            </a>
            .
          </p>
        </div>

        <div
          className="invitation-layout grid-2"
          data-reveal=""
          style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 64, alignItems: 'start', marginTop: 74 }}
        >
          <div className="invitation-steps" style={{ minWidth: 0 }}>
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
            id="invite-code-entry"
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

            <InviteCodeForm />

            <p className="bd" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.94rem', margin: '26px 0 0' }}>
              No code yet?{' '}
              <a href="#/apply" style={{ color: 'var(--aniwa-terracotta)', textDecoration: 'none' }}>
                Fill out an application form →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
