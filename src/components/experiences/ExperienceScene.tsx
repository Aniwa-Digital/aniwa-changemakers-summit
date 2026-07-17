import { useState } from 'react';

/** Bounding box of an object within the shared 2000×3583 art frame, expressed
 *  as percentages of that frame (top-left anchored). */
type Box = { left: number; top: number; width: number; height: number };

/** One layer of the campsite scene. Every `src` is a full-frame transparent
 *  layer that already places its object in the shared canvas — so the images
 *  stack at identical size/position and the composition emerges on its own.
 *  `box` marks where the object actually sits, used for the hover hotspot,
 *  glow, and label. `zIndex` is the paint order (higher = in front). */
export type ExperienceItem = {
  id: string;
  src: string;
  label: string;
  zIndex: number;
  box: Box;
};

/** Object placements measured from the art (all layers share one 2000×3583
 *  frame). Percentages are relative to that frame and are safe to fine-tune. */
export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  { id: 'yurts', src: '/assets/img/yurts.webp', label: 'Glamping', zIndex: 10, box: { left: 8, top: 76, width: 34, height: 13 } },
  { id: 'temescal', src: '/assets/img/temescal.webp', label: 'Temezcal (sweat lodge)', zIndex: 15, box: { left: 37, top: 82, width: 16, height: 8 } },
  { id: 'stage', src: '/assets/img/stage.webp', label: 'Panels and workshops', zIndex: 20, box: { left: 45, top: 77, width: 24, height: 10 } },
  { id: 'teepee', src: '/assets/img/teepee.webp', label: 'Ceremonies and gatherings', zIndex: 25, box: { left: 64, top: 71, width: 24, height: 18 } },
  { id: 'fire', src: '/assets/img/fire.webp', label: 'Fireside chats', zIndex: 30, box: { left: 42, top: 86, width: 15, height: 7 } },
  { id: 'food', src: '/assets/img/food.webp', label: 'Shared meals', zIndex: 35, box: { left: 56, top: 88, width: 27, height: 9 } },
];

const HIT_Z = 200;
const LABEL_Z = 300;

const pct = (n: number) => `${n}%`;

/**
 * Layered hover-reveal scene. The six full-frame art layers stack into one
 * cohesive campsite; a transparent hotspot over each object makes it
 * independently hoverable despite the overlap. Hovering lights a soft cosmic
 * nebula glow behind that object and fades in its label. Only one object is
 * active at a time. Everything is percentage-based so it rescales as a unit.
 */
export function ExperienceScene({
  items = EXPERIENCE_ITEMS,
  className = '',
}: {
  items?: ExperienceItem[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const activate = (id: string) => setHovered(id);
  const deactivate = (id: string) => setHovered((cur) => (cur === id ? null : cur));

  return (
    <div className={`exp-scene ${className}`.trim()} role="list" aria-label="What to expect at the Summit">
      {/* Frame is taller than the visible scene; bottom-aligned + clipped so we
          show the populated lower band of the art, not the empty sky above. */}
      <div className="exp-scene__frame">
        {/* Glows — behind every art layer; only the transparent sky lets them
            show, so each reads as a halo behind its own object. */}
        {items.map((item) => {
          const cx = item.box.left + item.box.width / 2;
          const cy = item.box.top + item.box.height / 2;
          const glowW = Math.max(item.box.width, item.box.height) * 1.6;
          return (
            <span
              key={`glow-${item.id}`}
              className={`exp-scene__glow${hovered === item.id ? ' is-on' : ''}`}
              aria-hidden="true"
              style={{ left: pct(cx), top: pct(cy), width: pct(glowW) }}
            />
          );
        })}

        {/* Art layers — identical full-frame stack, painted in z-order. */}
        {items.map((item) => (
          <img
            key={`img-${item.id}`}
            src={item.src}
            alt=""
            aria-hidden="true"
            className="exp-scene__layer"
            style={{ zIndex: item.zIndex }}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ))}

        {/* Hotspots — transparent hit targets over each object. Front-most
            objects carry a higher z so they win any genuine overlap. */}
        {items.map((item) => (
          <button
            key={`hit-${item.id}`}
            type="button"
            className="exp-scene__hotspot"
            aria-label={item.label}
            style={{
              left: pct(item.box.left),
              top: pct(item.box.top),
              width: pct(item.box.width),
              height: pct(item.box.height),
              zIndex: HIT_Z + item.zIndex,
            }}
            onMouseEnter={() => activate(item.id)}
            onMouseLeave={() => deactivate(item.id)}
            onFocus={() => activate(item.id)}
            onBlur={() => deactivate(item.id)}
          />
        ))}

        {/* Labels — above each object, fade + slide up on hover. */}
        {items.map((item) => {
          const cx = item.box.left + item.box.width / 2;
          return (
            <span
              key={`label-${item.id}`}
              className={`exp-scene__label${hovered === item.id ? ' is-on' : ''}`}
              style={{ left: pct(cx), top: pct(item.box.top), zIndex: LABEL_Z + item.zIndex }}
            >
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
