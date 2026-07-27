import { PurposePath } from './PurposePath';

interface InvitationProps {
  onInviteOpen: () => void;
}

/* Invitation — "A Call to Purpose" with the four-step path.
   Background comes from PurposeClosing continuum. */
export function Invitation({ onInviteOpen }: InvitationProps) {
  return (
    <div id="invitation" className="invitation-band">
      <div className="invitation-intro">
        <h2 className="disp invitation-intro__title">A Call to Purpose</h2>
        <p className="myth invitation-intro__body">
          Participation in the Aniwa Changemakers Summit&mdash;whether as an attendee or member of the Founders
          Circle&mdash;is by invitation, curated to ensure deep alignment, integrity, and shared commitment.
        </p>
        <div className="invitation-actions">
          <a href="#/apply" className="eye ember invitation-actions__apply">
            Apply for an Invitation
          </a>
          <button type="button" onClick={onInviteOpen} className="eye invitation-actions__code">
            Enter Invite Code
          </button>
        </div>
      </div>

      <div className="invitation-path-wrap">
        <PurposePath />
      </div>
    </div>
  );
}
