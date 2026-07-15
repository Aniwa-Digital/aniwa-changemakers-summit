import { useEffect, useRef, useState, type RefObject } from 'react';
import { ElementCards } from './ElementCards';

const ELEMENTS_BG_DESKTOP = '/assets/img/bg_elements.webp';
const ELEMENTS_BG_MOBILE =
  'https://res.cloudinary.com/dpd7ju6vn/image/upload/f_webp,q_auto:good/v1784008247/four_elements_mobile_ikoctf.webp';

/** Wait until the section bg has loaded and backdrop-filter has had a chance
 *  to composite, then fade the cards in so glass never flashes clear. */
function useGlassReady(imgRef: RefObject<HTMLImageElement | null>) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timers: number[] = [];

    const markReady = () => {
      // Double rAF + short delay lets Safari/Chrome finish the first blur pass.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          timers.push(
            window.setTimeout(() => {
              if (!cancelled) setReady(true);
            }, 80),
          );
        });
      });
    };

    const img = imgRef.current;
    if (!img) {
      markReady();
      return;
    }

    if (img.complete && img.naturalWidth > 0) {
      markReady();
    } else {
      const onLoad = () => markReady();
      const onError = () => markReady();
      img.addEventListener('load', onLoad);
      img.addEventListener('error', onError);
      // Fallback if the image never fires (cached edge cases).
      timers.push(window.setTimeout(markReady, 1200));
      return () => {
        cancelled = true;
        img.removeEventListener('load', onLoad);
        img.removeEventListener('error', onError);
        timers.forEach((id) => window.clearTimeout(id));
      };
    }

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [imgRef]);

  return ready;
}

/* The Work → "Explore the Four Elements". Image band with themes, cards,
   and Mind + Body + Planet overview. */
export function Days() {
  const imgRef = useRef<HTMLImageElement>(null);
  const glassReady = useGlassReady(imgRef);

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
      <div className={`elements-panel${glassReady ? ' elements-panel--glass-ready' : ''}`}>
        <div className="elements-panel__bg">
          <picture>
            <source media="(max-width: 720px)" srcSet={ELEMENTS_BG_MOBILE} type="image/webp" />
            <img
              ref={imgRef}
              src={ELEMENTS_BG_DESKTOP}
              alt=""
              className="elements-panel__bg-img"
              width={2816}
              height={6028}
              loading="lazy"
              decoding="async"
              aria-hidden="true"
            />
          </picture>
        </div>

        <div className="elements-panel__stack">
          <div className="elements-panel__header">
            <span className="eye elements-panel__pill">OUR TOPICS FOR 2026</span>
            <h2 className="disp elements-panel__title">
              <span className="elements-panel__title-desk">Our Elemental Focus</span>
              <span className="elements-panel__title-mobile">Our Elemental Focus</span>
            </h2>
          </div>
          <div className="elements-panel__dock">
            <ElementCards />
          </div>
          <div className="elements-expect">
            <h3 className="disp elements-expect__title">
              Mind&nbsp;+&nbsp;Body&nbsp;+&nbsp;Planet
            </h3>
            <p className="bd elements-expect__body">
              Panels, practices, and private sessions designed to cultivate mind-share and presence in alignment with our
              full selves — on a private meadow tucked among the countryside for Sonoma County, California.
            </p>
            <p className="bd elements-expect__body">
              Arrive knowing some names and leave with a shared mission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
