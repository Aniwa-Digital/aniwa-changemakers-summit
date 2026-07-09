import { Modal } from '../ui/Modal';
import { InviteCodeForm } from './InviteCodeForm';

interface InviteCodeModalProps {
  open: boolean;
  onClose: () => void;
}

export function InviteCodeModal({ open, onClose }: InviteCodeModalProps) {
  return (
    <Modal open={open} onClose={onClose} zIndex={90} maxWidth={480} padding="46px 42px 40px" label="Enter invite code">
      <div className="eye" style={{ color: 'var(--aniwa-terracotta)' }}>
        Entry is the first ceremony
      </div>
      <h3 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '2rem', margin: '12px 0 0' }}>
        Received an invite code?
      </h3>
      <p className="bd" style={{ color: 'rgba(46,40,32,0.7)', fontSize: '0.95rem', margin: '12px 0 0' }}>
        Enter it below to begin your registration process. Once complete, resources, locations, and other summit
        essentials can be found in your participant portal.
      </p>

      <InviteCodeForm variant="modal" />

      <p className="bd" style={{ color: 'rgba(46,40,32,0.55)', fontSize: '0.92rem', margin: '22px 0 0' }}>
        No code yet?{' '}
        <a href="#/apply" onClick={onClose} style={{ color: 'var(--aniwa-terracotta)', textDecoration: 'none' }}>
          Fill out an application form →
        </a>
      </p>
    </Modal>
  );
}
