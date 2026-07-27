import { ANIWA_WHITE_LOGO_SRC } from '../../lib/brand';

type BrandMarkProps = {
  logoHeight?: number;
  className?: string;
  word?: string;
  /** yucca = default wordmark; display = Averia Serif Libre Bold */
  wordFont?: 'yucca' | 'display';
};

/* Stacked white logomark + wordmark */
export function BrandMark({
  logoHeight = 26,
  className = '',
  word = 'ANIWA',
  wordFont = 'yucca',
}: BrandMarkProps) {
  return (
    <div className={`brand-mark${className ? ` ${className}` : ''}`} aria-label={word}>
      <img src={ANIWA_WHITE_LOGO_SRC} alt="" className="brand-mark__logo" style={{ height: logoHeight, width: 'auto' }} />
      <span
        className={`brand-mark__word${wordFont === 'display' ? ' brand-mark__word--display' : ''}`}
        aria-hidden="true"
      >
        {word}
      </span>
    </div>
  );
}
