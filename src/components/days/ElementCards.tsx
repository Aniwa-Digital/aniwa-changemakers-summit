import { useEffect, useState } from 'react';
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

function ElementCard({
  element,
  openable,
  active,
  onOpen,
}: {
  element: ElementBox;
  openable: boolean;
  active: boolean;
  onOpen: () => void;
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

  return (
    <div className={`element-slot ${slotClass[element.id]}${active ? ' element-slot--open' : ''}`}>
      {openable ? (
        <button
          type="button"
          className="element-card"
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
          onClick={onOpen}
          aria-expanded={active}
          aria-label={`Learn more about ${element.name}`}
          aria-hidden={active || undefined}
          tabIndex={active ? -1 : 0}
        >
          <ElementCardFaces element={element} />
        </button>
      ) : (
        <div
          className="element-card"
          role="group"
          aria-label={`${element.name}: ${element.description}`}
          onPointerMove={onPointerMove}
          onPointerLeave={onPointerLeave}
        >
          <ElementCardFaces element={element} />
        </div>
      )}
    </div>
  );
}

function ElementCardFaces({ element }: { element: ElementBox }) {
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
      </div>
    </div>
  );
}

function ElementCardModal({
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
        className="elements-backdrop elements-backdrop--visible"
        aria-label="Close element card"
        onClick={onClose}
      />
      <div
        className="element-card element-card--modal"
        role="dialog"
        aria-modal="true"
        aria-label={element.name}
      >
        <div className="element-card__panel">
          <button type="button" className="element-card__close" onClick={onClose} aria-label="Close">
            ×
          </button>
          <div className="element-card__icon-wrap">
            <img src={element.img} alt="" className="element-card__icon" decoding="async" />
          </div>
          <span className="eye element-card__label">{element.name}</span>
          <p className="disp element-card__title">{element.description.replace(/\.$/, '')}</p>
          <p className="bd element-card__detail">{element.longDescription}</p>
        </div>
      </div>
    </>,
    document.body,
  );
}

export function ElementCards() {
  const fineHover = useFineHover();
  const [activeId, setActiveId] = useState<ElementId | null>(null);
  const activeElement = activeId ? elements.find((el) => el.id === activeId) : undefined;
  const openable = !fineHover;

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
    <div className="elements-stage">
      {openable && activeElement ? (
        <ElementCardModal element={activeElement} onClose={() => setActiveId(null)} />
      ) : null}
      <div
        className={`elements-diamond${activeId ? ' elements-diamond--focused' : ''}`}
        data-active={activeId ?? undefined}
      >
        {elements.map((el) => (
          <ElementCard
            key={el.id}
            element={el}
            openable={openable}
            active={activeId === el.id}
            onOpen={() => setActiveId(el.id)}
          />
        ))}
      </div>
    </div>
  );
}
