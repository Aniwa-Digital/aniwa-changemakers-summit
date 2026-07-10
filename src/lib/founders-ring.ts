/** Polar ring math for the draggable Founders Circle. */

export const BOTTOM_ANGLE = Math.PI / 2;

export function seatBaseAngle(index: number, count: number): number {
  return (index / count) * Math.PI * 2 - Math.PI / 2;
}

export function normalizeAngle(angle: number): number {
  let a = angle % (Math.PI * 2);
  if (a > Math.PI) a -= Math.PI * 2;
  if (a < -Math.PI) a += Math.PI * 2;
  return a;
}

/** Rotation (rad) that places `index` at the bottom of the ring. */
export function rotationForIndex(index: number, count: number): number {
  return BOTTOM_ANGLE - seatBaseAngle(index, count);
}

/** Shortest rotation from `current` that places `index` at the bottom. */
export function rotationToIndex(current: number, index: number, count: number): number {
  const base = rotationForIndex(index, count);
  return current + normalizeAngle(base - current);
}

/** Index of the seat closest to the bottom for a given ring rotation. */
export function nearestIndex(rotation: number, count: number): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < count; i++) {
    const ang = seatBaseAngle(i, count) + rotation;
    const dist = Math.abs(normalizeAngle(ang - BOTTOM_ANGLE));
    if (dist < bestDist) {
      bestDist = dist;
      best = i;
    }
  }
  return best;
}

export function pointerAngle(clientX: number, clientY: number, rect: DOMRect): number {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  return Math.atan2(clientY - cy, clientX - cx);
}

/** True when the pointer lies on the portrait ring (not the empty stage corners). */
export function isOnRing(clientX: number, clientY: number, rect: DOMRect): boolean {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dist = Math.hypot(clientX - cx, clientY - cy);
  const norm = dist / Math.min(rect.width, rect.height);
  return norm >= 0.12 && norm <= 0.58;
}
