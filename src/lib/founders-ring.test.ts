import { describe, expect, it } from 'vitest';
import {
  BOTTOM_ANGLE,
  isOnRing,
  nearestIndex,
  normalizeAngle,
  rotationForIndex,
  rotationToIndex,
  seatBaseAngle,
} from './founders-ring';

describe('founders-ring', () => {
  it('places index 0 at the bottom when rotation is applied', () => {
    const count = 15;
    const rot = rotationForIndex(0, count);
    const ang = seatBaseAngle(0, count) + rot;
    expect(Math.abs(normalizeAngle(ang - BOTTOM_ANGLE))).toBeLessThan(0.001);
  });

  it('snaps every index to the bottom with rotationForIndex', () => {
    const count = 15;
    for (let i = 0; i < count; i++) {
      const rot = rotationForIndex(i, count);
      expect(nearestIndex(rot, count)).toBe(i);
    }
  });

  it('normalizeAngle wraps to [-π, π]', () => {
    expect(normalizeAngle(Math.PI * 3)).toBeCloseTo(Math.PI, 5);
    expect(normalizeAngle(-Math.PI * 3)).toBeCloseTo(-Math.PI, 5);
  });

  it('isOnRing accepts points on the portrait band', () => {
    const rect = { left: 0, top: 0, width: 400, height: 400 } as DOMRect;
    expect(isOnRing(200, 200 + 400 * 0.42, rect)).toBe(true);
    expect(isOnRing(20, 20, rect)).toBe(false);
  });

  it('rotationToIndex takes the shortest path between adjacent seats', () => {
    const count = 15;
    const atVivien = rotationForIndex(0, count);
    const toAnka = rotationToIndex(atVivien, 14, count);
    expect(Math.abs(normalizeAngle(toAnka - atVivien))).toBeLessThan((Math.PI * 2) / count + 0.001);
    expect(nearestIndex(toAnka, count)).toBe(14);
  });
});
