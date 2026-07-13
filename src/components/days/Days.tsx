import { ElementCards } from './ElementCards';

const ELEMENTS_BG_DESKTOP =
  'https://res.cloudinary.com/dpd7ju6vn/image/upload/v1783934309/four_elements_vision_efycir.png';
const ELEMENTS_BG_MOBILE = '/assets/img/four-elements-mobile.webp';

/* The Work → "Explore the Four Elements". Image band with themes, cards,
   and Mind + Body + Planet overview. */
export function Days() {
  return (
    <section
      id="the-days"
      style={{
        position: 'relative',
        zIndex: 3,
        background: 'transparent',
        padding: 0,
      }}
    >
      <div className="elements-panel">
        <div className="elements-panel__bg">
          <picture>
            <source media="(max-width: 720px)" srcSet={ELEMENTS_BG_MOBILE} type="image/webp" />
            <img
              src={ELEMENTS_BG_DESKTOP}
              alt=""
              className="elements-panel__bg-img"
              width={862}
              height={1825}
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
          </picture>
        </div>

        <div className="elements-panel__stack">
          <div className="elements-panel__header">
            <span className="eye elements-panel__pill">OUR TOPICS FOR 2026</span>
            <h2 className="disp elements-panel__title">Explore the Four Elements</h2>
          </div>
          <div className="elements-panel__dock">
            <ElementCards />
          </div>
          <div className="elements-expect">
            <div className="eye elements-expect__eyebrow">What to expect</div>
            <h3 className="disp elements-expect__title">
              Mind&nbsp;+&nbsp;Body&nbsp;+&nbsp;Planet
            </h3>
            <p className="bd elements-expect__body">
              Workshops, discussion panels, and mind-share and heart presence in alignment with the four elements they
              serve to protect — on a private reserve tucked amongst the savannah oak of Sonoma County, California.
            </p>
            <p className="bd elements-expect__body">
              You come knowing some names, you leave with a shared mission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
