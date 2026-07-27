import { useCallback, useEffect, useRef, useState } from 'react';
import type { FounderSeat } from '../../lib/content';
import {
  isOnRing,
  nearestIndex,
  normalizeAngle,
  pointerAngle,
  rotationForIndex,
  rotationToIndex,
} from '../../lib/founders-ring';
import { FounderBioText, FounderProfileLinks } from './FounderBio';

const DRAG_START_RAD = 0.06;

function normalizeDragDelta(delta: number): number {
  return normalizeAngle(delta);
}

type FounderDetailProps = {
  founder: FounderSeat;
  reduceMotion: boolean;
};

function FounderDetail({ founder, reduceMotion }: FounderDetailProps) {
  return (
    <div className="founders-detail" aria-live="polite" aria-atomic="true">
      <div
        key={founder.name}
        className={`founders-detail__inner${reduceMotion ? ' founders-detail__inner--reduced' : ''}`}
      >
        {founder.role ? <p className="eye founders-detail__title">{founder.role}</p> : null}
        {founder.bio ? <FounderBioText key={founder.name} bio={founder.bio} /> : null}
        <FounderProfileLinks founder={founder} />
      </div>
    </div>
  );
}

type FoundersDraggableRingProps = {
  founders: FounderSeat[];
};

type DragState = {
  pointerId: number;
  startRot: number;
  startAng: number;
  captured: boolean;
};

export function FoundersDraggableRing({ founders }: FoundersDraggableRingProps) {
  const count = founders.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);

  const [rotation, setRotation] = useState(() => rotationForIndex(0, count));
  const rotationRef = useRef(rotation);
  const movedRef = useRef(false);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const [snapping, setSnapping] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const activeIdx = nearestIndex(rotation, count);
  const active = founders[activeIdx];

  const finishDrag = useCallback(
    (nextRotation: number) => {
      const idx = nearestIndex(nextRotation, count);
      setSnapping(true);
      setDragging(false);
      setRotation(rotationToIndex(nextRotation, idx, count));
      dragRef.current = null;
    },
    [count],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    if (!isOnRing(e.clientX, e.clientY, rect)) return;

    dragRef.current = {
      pointerId: e.pointerId,
      startRot: rotationRef.current,
      startAng: pointerAngle(e.clientX, e.clientY, rect),
      captured: false,
    };
    movedRef.current = false;
    setSnapping(false);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const ang = pointerAngle(e.clientX, e.clientY, rect);
    const rawDelta = ang - drag.startAng;
    const delta = normalizeDragDelta(rawDelta);

    if (!drag.captured) {
      if (Math.abs(delta) < DRAG_START_RAD) return;
      drag.captured = true;
      stage.setPointerCapture(e.pointerId);
      setDragging(true);
    }

    e.preventDefault();
    if (Math.abs(delta) > 0.02) movedRef.current = true;
    const next = drag.startRot + rawDelta;
    rotationRef.current = next;
    setRotation(next);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    if (drag.captured) stageRef.current?.releasePointerCapture(e.pointerId);
    if (drag.captured) finishDrag(rotationRef.current);
    else dragRef.current = null;
  };

  const snapToIndex = (index: number) => {
    movedRef.current = false;
    setSnapping(true);
    setDragging(false);
    dragRef.current = null;
    setRotation(rotationToIndex(rotationRef.current, index, count));
  };

  const goToOffset = (delta: number) => {
    snapToIndex((activeIdx + delta + count) % count);
  };

  const rotorTransition =
    snapping && !reduceMotion ? 'transform 0.55s var(--ease-cinematic)' : 'none';

  const counterRotate = (extra?: string) => ({
    transform: extra ? `${extra} rotate(${-rotation}rad)` : `rotate(${-rotation}rad)`,
    transition: rotorTransition,
  });

  return (
    <div className="founders-interactive" data-drag-ring="" data-reveal="">
      <div
        ref={stageRef}
        className={`founders-ring-stage${dragging ? ' founders-ring-stage--dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="founders-ring-rotor"
          style={{ transform: `rotate(${rotation}rad)`, transition: rotorTransition }}
          onTransitionEnd={() => setSnapping(false)}
        >
          <img
            data-apply-compass=""
            className="founders-ring-compass"
            src="/assets/compass/compass.svg"
            alt=""
            width={995}
            height={995}
          />

          {founders.map((f, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={f.name ?? `seat-${i}`}
                className={`founders-ring-seat${isActive ? ' founders-ring-seat--active' : ''}${dragging ? ' founders-ring-seat--dragging' : ''}`}
                style={{
                  left: `${f.left}%`,
                  top: `${f.top}%`,
                }}
              >
                {f.open ? (
                  <button
                    type="button"
                    className="open-seat founders-ring-seat__btn"
                    aria-label="Open seat"
                    style={counterRotate()}
                  >
                    +
                  </button>
                ) : (
                  <button
                    type="button"
                    className="founders-ring-seat__btn"
                    onClick={() => {
                      movedRef.current = false;
                      snapToIndex(i);
                    }}
                    aria-label={`${f.name}${isActive ? ', selected' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    style={counterRotate()}
                  >
                    <div className="founder-portrait">
                      <img src={f.img} alt="" loading="lazy" decoding="async" draggable={false} />
                    </div>
                  </button>
                )}
              </div>
            );
          })}

          <div className="founders-spark" aria-hidden="true" style={counterRotate('translate(-50%, -50%)')}>
            ✦
          </div>
        </div>
      </div>

      {active && !active.open ? (
        <div className="founders-detail-wrap">
          <div className="founders-detail-name-row">
            <button
              type="button"
              className="founders-nav__arrow founders-nav__arrow--prev"
              onClick={() => goToOffset(1)}
              aria-label="Previous founder"
            >
              ←
            </button>
            <h3 key={active.name} className="disp founders-detail__name">
              {active.name}
            </h3>
            <button
              type="button"
              className="founders-nav__arrow founders-nav__arrow--next"
              onClick={() => goToOffset(-1)}
              aria-label="Next founder"
            >
              →
            </button>
          </div>
          <FounderDetail founder={active} reduceMotion={reduceMotion} />
        </div>
      ) : null}
    </div>
  );
}
