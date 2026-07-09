import { useEffect, useState } from 'react';
import { elements, type ElementBox, type ElementId } from '../../lib/content';
import { SacredGeometryBg } from './SacredGeometryBg';

const slotClass: Record<ElementId, string> = {
  air: 'element-slot--air',
  water: 'element-slot--water',
  fire: 'element-slot--fire',
  earth: 'element-slot--earth',
};

function ElementCard({
  element,
  active,
  onToggle,
}: {
  element: ElementBox;
  active: boolean;
  onToggle: () => void;
}) {
  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
    const cx = clamp01(x);
    const cy = clamp01(y);
    el.style.setProperty('--mx', `${(cx * 100).toFixed(2)}%`);
    el.style.setProperty('--my', `${(cy * 100).toFixed(2)}%`);
    el.style.setProperty('--tilt-x', `${(cx - 0.5) * 2}`);
    el.style.setProperty('--tilt-y', `${(cy - 0.5) * 2}`);
  };

  const onPointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    el.style.setProperty('--tilt-x', '0');
    el.style.setProperty('--tilt-y', '0');
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  };

  return (
    <div className={`element-slot ${slotClass[element.id]}`}>
      <button
        type="button"
        className={`element-card${active ? ' element-card--active' : ''}`}
        onClick={onToggle}
        onPointerMove={active ? undefined : onPointerMove}
        onPointerLeave={active ? undefined : onPointerLeave}
        aria-expanded={active}
        aria-label={active ? `Close ${element.name}` : `Learn more about ${element.name}`}
      >
        <div className="element-card__flipper">
          <div className="element-card__face element-card__face--front">
            <div className="element-card__icon-wrap">
              <img src={element.img} alt="" className="element-card__icon" />
            </div>
            <div className="element-card__copy">
              <span className="eye element-card__label">{element.name}</span>
              <p className="disp element-card__title">{element.description.replace(/\.$/, '')}</p>
            </div>
          </div>
          <div className="element-card__face element-card__face--back">
            <span className="eye element-card__label">{element.name}</span>
            <p className="bd element-card__detail">{element.longDescription}</p>
            <span className="element-card__hint">Tap to return</span>
          </div>
        </div>
      </button>
    </div>
  );
}

/* Four elemental cards in a diamond — click to center and flip for the full description. */
export function ElementCards() {
  const [activeId, setActiveId] = useState<ElementId | null>(null);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveId(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [activeId]);

  const toggle = (id: ElementId) => setActiveId((prev) => (prev === id ? null : id));

  return (
    <div className="elements-stage" data-reveal="">
      <div className="elements-geometry-wrap" aria-hidden="true">
        <SacredGeometryBg />
      </div>
      {activeId && (
        <button
          type="button"
          className="elements-backdrop"
          aria-label="Close element card"
          onClick={() => setActiveId(null)}
        />
      )}
      <div className={`elements-diamond${activeId ? ' elements-diamond--focused' : ''}`} data-active={activeId ?? undefined}>
        {elements.map((el) => (
          <ElementCard
            key={el.id}
            element={el}
            active={activeId === el.id}
            onToggle={() => toggle(el.id)}
          />
        ))}
      </div>
    </div>
  );
}
