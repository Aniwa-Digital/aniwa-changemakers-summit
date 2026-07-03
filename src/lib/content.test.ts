import { describe, expect, test } from 'vitest';
import {
  BUILDER_SLOTS,
  KEEPER_SLOTS,
  ROSTER_SIZE,
  buildReserve,
  buildRosterSlots,
  builders,
  founders,
  keepers,
  placeFounders,
} from './content';

describe('roster construction', () => {
  test('fills all 12 slots exactly once', () => {
    const slots = buildRosterSlots();
    expect(slots).toHaveLength(ROSTER_SIZE);
    expect(slots.every((s) => s !== undefined)).toBe(true);
    expect([...KEEPER_SLOTS, ...BUILDER_SLOTS].sort((a, b) => a - b)).toEqual(
      Array.from({ length: ROSTER_SIZE }, (_, i) => i),
    );
  });

  test('keeper slots hold keepers, builder slots hold builders', () => {
    const slots = buildRosterSlots();
    KEEPER_SLOTS.forEach((i) => expect(slots[i].badge).toBe('Keeper'));
    BUILDER_SLOTS.forEach((i) => expect(slots[i].badge).toBe('Builder'));
  });

  test('all slots start fully opaque', () => {
    expect(buildRosterSlots().every((s) => s.op === 1)).toBe(true);
  });

  test('reserve pool holds the builders that did not get a slot', () => {
    const reserve = buildReserve();
    expect(reserve).toHaveLength(builders.length - BUILDER_SLOTS.length);
    const onGrid = new Set(buildRosterSlots().map((s) => s.name));
    reserve.forEach((p) => expect(onGrid.has(p.name)).toBe(false));
  });

  test('pools have the expected sizes', () => {
    expect(keepers).toHaveLength(4);
    expect(builders).toHaveLength(12);
  });
});

describe('founders ring placement', () => {
  test('has 7 members and exactly one open seat', () => {
    expect(founders).toHaveLength(8);
    expect(founders.filter((f) => f.open)).toHaveLength(1);
  });

  test('places every seat on a circle of the given radius', () => {
    placeFounders(40).forEach((f) => {
      const d = Math.hypot(f.left - 50, f.top - 50);
      expect(d).toBeCloseTo(40, 1);
    });
  });

  test('first seat sits at the top of the ring (12 o’clock)', () => {
    const [first] = placeFounders(40);
    expect(first.left).toBeCloseTo(50, 1);
    expect(first.top).toBeCloseTo(10, 1);
  });
});
