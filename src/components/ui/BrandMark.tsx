import { ANIWA_WHITE_LOGO_SRC } from '../../lib/brand';

type BrandMarkProps = {
  logoHeight?: number;
  className?: string;
};

/* Stacked white logomark + Yucca wordmark */
export function BrandMark({ logoHeight = 26, className = '' }: BrandMarkProps) {
  return (
    <div className={`brand-mark${className ? ` ${className}` : ''}`} aria-label="Aniwa">
      <img src={ANIWA_WHITE_LOGO_SRC} alt="" className="brand-mark__logo" style={{ height: logoHeight, width: 'auto' }} />
      <span className="brand-mark__word" aria-hidden="true">
        ANIWA
      </span>
    </div>
  );
}
