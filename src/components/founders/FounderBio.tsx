import { useState } from 'react';
import type { FounderSeat } from '../../lib/content';

const BIO_PREVIEW_CHARS = 200;

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max);
  const breakAt = slice.lastIndexOf(' ');
  const clipped = (breakAt > max * 0.6 ? slice.slice(0, breakAt) : slice).trimEnd();
  return `${clipped}…`;
}

export function FounderBioText({ bio, className }: { bio: string; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const needsMore = bio.length > BIO_PREVIEW_CHARS;
  const shown = !needsMore || expanded ? bio : truncateAtWord(bio, BIO_PREVIEW_CHARS);

  return (
    <div className="founders-detail__bio-wrap">
      <p className={className ?? 'bd founders-detail__bio'}>{shown}</p>
      {needsMore ? (
        <button
          type="button"
          className="eye founders-detail__read-more"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      ) : null}
    </div>
  );
}

export function FounderProfileLinks({
  founder,
  className,
}: {
  founder: Pick<FounderSeat, 'linkedin' | 'website' | 'instagram'>;
  className?: string;
}) {
  if (!founder.linkedin && !founder.website && !founder.instagram) return null;

  return (
    <div className={className ?? 'founders-detail__links'}>
      {founder.linkedin ? (
        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="eye founders-detail__profile-link"
        >
          View Profile
        </a>
      ) : null}
      {founder.website ? (
        <a
          href={founder.website}
          target="_blank"
          rel="noopener noreferrer"
          className="eye founders-detail__profile-link"
        >
          Website
        </a>
      ) : null}
      {founder.instagram ? (
        <a
          href={founder.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="eye founders-detail__profile-link"
        >
          Instagram
        </a>
      ) : null}
    </div>
  );
}
