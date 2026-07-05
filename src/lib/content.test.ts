import { describe, expect, test } from 'vitest';
import {
  HELIX_UNIT,
  buildFellowship,
  builders,
  fellowship,
  founders,
  helixPath,
  keepers,
  placeFounders,
} from './content';

describe('fellowship construction', () => {
  test('pools have the expected sizes', () => {
    expect(keepers).toHaveLength(4);
    expect(builders).toHaveLength(12);
  });

  test('seats everyone exactly once', () => {
    expect(fellowship).toHaveLength(keepers.length + builders.length);
    const names = new Set(fellowship.map((p) => p.name));
    expect(names.size).toBe(fellowship.length);
    [...keepers, ...builders].forEach((p) => expect(names.has(p.name)).toBe(true));
  });

  test('spreads keepers evenly — one keeper in every group of four seats', () => {
    for (let g = 0; g < 4; g++) {
      const group = fellowship.slice(g * 4, g * 4 + 4);
      expect(group.filter((p) => p.badge === 'Keeper')).toHaveLength(1);
    }
  });

  test('every member carries a portrait crop position', () => {
    fellowship.forEach((p) => expect(p.objectPosition).toMatch(/^\d+% \d+%$/));
  });

  test('is a pure function of its pools', () => {
    expect(buildFellowship(keepers, builders)).toEqual(fellowship);
  });
});

describe('helix path geometry', () => {
  test('spans one half-turn per seat', () => {
    const n = 5;
    const d = helixPath(n, -1);
    // one M plus n quadratic segments
    expect(d.match(/Q/g)).toHaveLength(n);
    expect(d.startsWith('M300,0')).toBe(true);
    expect(d.endsWith(` 300,${n * HELIX_UNIT}`)).toBe(true);
  });

  test('mirrored strands bulge to opposite sides', () => {
    const a = helixPath(2, -1, 100);
    const b = helixPath(2, 1, 100);
    expect(a).toContain('Q200,'); // first bulge left of center (300 - 100)
    expect(b).toContain('Q400,'); // first bulge right of center (300 + 100)
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
