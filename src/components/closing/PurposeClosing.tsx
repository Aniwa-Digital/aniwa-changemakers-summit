import { Suspense, lazy } from 'react';
import { Invitation } from '../invitation/Invitation';
import { BrandMark } from '../ui/BrandMark';

const FireSphere = lazy(() => import('./FireSphere'));
const CompassOverlay = lazy(() => import('../hero/CompassOverlay'));

const PURPOSE_BG =
  'https://res.cloudinary.com/dpd7ju6vn/image/upload/f_webp,q_auto:good/v1784012734/OC_06_2_lefxtp.webp';

type PurposeClosingProps = {
  onInviteOpen: () => void;
};

/* Continuous photo (gradient baked in): Call to Purpose → Two paths → compass → footer. */
export function PurposeClosing({ onInviteOpen }: PurposeClosingProps) {
  return (
    <section id="reciprocity" className="purpose-continuum">
      <div className="purpose-continuum__bg" aria-hidden="true">
        <img
          src={PURPOSE_BG}
          alt=""
          className="purpose-continuum__bg-img"
          width={1920}
          height={4411}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="purpose-continuum__stack">
        <Invitation onInviteOpen={onInviteOpen} />

        <div id="closing" className="closing-band">
          <div className="closing-copy">
            <h2 className="disp closing-title">
              Two paths.
              <br />
              One fire.
              <br />
              A new story.
            </h2>
          </div>

          <div className="closing-visual">
            <div className="closing-compass">
              <Suspense fallback={null}>
                <CompassOverlay scrollSpin={false} color="#F4F1EB" opacity={0.42} />
              </Suspense>
            </div>
            <div className="fire-orb">
              <Suspense fallback={null}>
                <FireSphere bloomStrength={2.7} bloomRadius={1.05} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <footer className="closing-footer">
        <p className="closing-footer__lead">Shaping our future with wisdom</p>
        <div className="closing-contact">
          <BrandMark logoHeight={34} word="Huya Aniwa" wordFont="display" />
          <span className="eye closing-footer__meta">summit@huyaaniwa.org</span>
        </div>
        <div className="eye closing-footer__meta closing-footer__meta--soft">
          A nonprofit initiative of Aniwa &amp; the Huya Aniwa Foundation
        </div>
        <div className="eye closing-footer__meta closing-footer__meta--soft closing-footer__credit">
          Compass design by Dante Orpilla from the book,{' '}
          <a
            href="https://www.amazon.com/Which-Way-North-Creative-Marketers/dp/1637744064"
            target="_blank"
            rel="noopener noreferrer"
            className="closing-footer__link"
          >
            Which Way Is North
          </a>{' '}
          by Will Cady
        </div>
      </footer>
    </section>
  );
}
