import type { FounderSeat } from '../../lib/content';
import { Modal } from '../ui/Modal';

type FounderBioModalProps = {
  founder: FounderSeat | null;
  onClose: () => void;
};

export function FounderBioModal({ founder, onClose }: FounderBioModalProps) {
  if (!founder?.name) return null;

  return (
    <Modal open={founder !== null} onClose={onClose} label={founder.name} maxWidth={620} padding="40px">
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
          <div
            style={{
              width: 108,
              height: 108,
              flex: '0 0 auto',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(160,74,42,0.5)',
              background: '#EFE7D3',
            }}
          >
            <img
              src={founder.img}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
          </div>
          <div style={{ minWidth: 200, flex: '1 1 auto' }}>
            <h4 className="disp" style={{ color: 'var(--ink-on-light)', fontSize: '1.9rem', margin: 0, lineHeight: 1.1 }}>
              {founder.name}
            </h4>
            {founder.role ? (
              <div className="eye" style={{ color: 'var(--aniwa-terracotta)', fontSize: '0.66rem', marginTop: 8, lineHeight: 1.45 }}>
                {founder.role}
              </div>
            ) : null}
          </div>
        </div>
        {founder.bio ? (
          <p className="bd" style={{ color: 'rgba(46,40,32,0.78)', fontSize: '0.98rem', lineHeight: 1.62, margin: '24px 0 0' }}>
            {founder.bio}
          </p>
        ) : null}
        {founder.linkedin ? (
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="eye founders-detail__profile-link"
            style={{ marginTop: founder.bio ? 20 : 24 }}
          >
            View profile →
          </a>
        ) : null}
      </div>
    </Modal>
  );
}
