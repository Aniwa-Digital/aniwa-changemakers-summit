import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { elements, type ElementBox, type ElementId } from '../../lib/content';

const slotClass: Record<ElementId, string> = {
  air: 'element-slot--air',
  water: 'element-slot--water',
  fire: 'element-slot--fire',
  earth: 'element-slot--earth',
};

/** Desktop hover-flip vs mobile tap-to-open modal. */
function useFineHover() {
  const [fineHover, setFineHover] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(hover: hover) and (pointer: fine)').matches
      : true,
  );

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setFineHover(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return fineHover;
}

/** Track native rail scroll so taps after a drag don't open the modal. */
function useRailScrollGuard(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const draggedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    let settleTimer = 0;
    const onScroll = () => {
      draggedRef.current = true;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        draggedRef.current = false;
      }, 120);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.clearTimeout(settleTimer);
    };
  }, [enabled]);

  return { ref, wasDragged: () => draggedRef.current };
}

function ElementCard({
  element,
  active,
  openable,
  onOpen,
  wasDragged,
}: {
  element: ElementBox;
  active: boolean;
  openable: boolean;
  onOpen: () => void;
  wasDragged: () => boolean;
}) {
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
    el.style.setProperty('--mx', `${(clamp01(x) * 100).toFixed(2)}%`);
    el.style.setProperty('--my', `${(clamp01(y) * 100).toFixed(2)}%`);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  };

  const sharedProps = {
    className: 'element-card',
    onPointerMove,
    onPointerLeave,
    'aria-hidden': active || undefined,
    tabIndex: active ? -1 : 0,
  } as const;

  return (
    <div className={`element-slot ${slotClass[element.id]}${active ? ' element-slot--open' : ''}`}>
      {openable ? (
        <button
          type="button"
          {...sharedProps}
          onClick={() => {
            if (wasDragged()) return;
            onOpen();
          }}
          aria-expanded={active}
          aria-label={active ? undefined : `Learn more about ${element.name}`}
        >
          <ElementCardFaces element={element} showHint />
        </button>
      ) : (
        <div {...sharedProps} role="group" aria-label={`${element.name}: ${element.description}`}>
          <ElementCardFaces element={element} />
        </div>
      )}
    </div>
  );
}

function ElementCardFaces({ element, showHint = false }: { element: ElementBox; showHint?: boolean }) {
  return (
    <div className="element-card__flipper">
      <div className="element-card__face element-card__face--front">
        <div className="element-card__icon-wrap">
          <img src={element.img} alt="" className="element-card__icon" loading="lazy" decoding="async" />
        </div>
        <div className="element-card__copy">
          <span className="eye element-card__label">{element.name}</span>
          <p className="disp element-card__title">{element.description.replace(/\.$/, '')}</p>
        </div>
      </div>
      <div className="element-card__face element-card__face--back">
        <span className="eye element-card__label">{element.name}</span>
        <p className="bd element-card__detail">{element.longDescription}</p>
        {showHint ? <span className="element-card__hint">Tap to return</span> : null}
      </div>
    </div>
  );
}

function ElementCardOverlay({
  element,
  onClose,
}: {
  element: ElementBox;
  onClose: () => void;
}) {
  return createPortal(
    <>
      <button
        type="button"
        className="elements-backdrop"
        aria-label="Close element card"
        onClick={onClose}
      />
      <button
        type="button"
        className="element-card element-card--open"
        onClick={onClose}
        aria-label={`Close ${element.name}`}
      >
        <div className="element-card__panel">
          <span className="eye element-card__label">{element.name}</span>
          <p className="bd element-card__detail">{element.longDescription}</p>
          <span className="element-card__hint">Tap to return</span>
        </div>
      </button>
    </>,
    document.body,
  );
}

/* Diamond on desktop; horizontal drag-scroll rail on mobile with tap-to-open. */
export function ElementCards() {
  const fineHover = useFineHover();
  const [activeId, setActiveId] = useState<ElementId | null>(null);
  const activeElement = activeId ? elements.find((el) => el.id === activeId) : undefined;
  const openable = !fineHover;
  const { ref: railRef, wasDragged } = useRailScrollGuard(openable);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeId]);

  useEffect(() => {
    if (fineHover) setActiveId(null);
  }, [fineHover]);

  return (
    <div className={`elements-stage${openable ? ' elements-stage--rail' : ''}`}>
      {openable && activeElement && (
        <ElementCardOverlay element={activeElement} onClose={() => setActiveId(null)} />
      )}
      <div
        ref={railRef}
        className={`elements-diamond${activeId ? ' elements-diamond--focused' : ''}${openable ? ' elements-diamond--rail' : ''}`}
        data-active={activeId ?? undefined}
        data-lenis-prevent={openable ? '' : undefined}
      >
        {elements.map((el) => (
          <ElementCard
            key={el.id}
            element={el}
            active={activeId === el.id}
            openable={openable}
            onOpen={() => setActiveId(el.id)}
            wasDragged={wasDragged}
          />
        ))}
      </div>
    </div>
  );
}
