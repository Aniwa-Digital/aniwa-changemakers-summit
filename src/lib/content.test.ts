import { describe, expect, test } from 'vitest';
import {
  FELLOWSHIP_ROWS,
  HELIX_UNIT,
  fellowshipLeft,
  fellowshipRight,
  founders,
  helixPath,
  placeFounders,
} from './content';

describe('fellowship strands', () => {
  test('strands have the expected sizes and row count', () => {
    expect(fellowshipLeft).toHaveLength(10);
    expect(fellowshipRight).toHaveLength(10);
    expect(FELLOWSHIP_ROWS).toBe(10);
  });

  test('seats everyone exactly once across both strands', () => {
    const all = [...fellowshipLeft, ...fellowshipRight];
    const names = new Set(all.map((p) => p.name));
    expect(names.size).toBe(all.length);
  });

  test('every member carries a portrait crop position, a bio, and a portrait', () => {
    [...fellowshipLeft, ...fellowshipRight].forEach((p) => {
      expect(p.objectPosition).toMatch(/^\d+% \d+%$/);
      expect(p.bio.length).toBeGreaterThan(80);
      expect(p.img).toMatch(/^\/assets\/people\/.+\.webp$/);
    });
  });

  test('leadership ordering is respected at the anchors', () => {
    expect(fellowshipLeft[0].name).toBe('Tenzin Seldon');
    expect(fellowshipLeft[9].name).toBe('Ruslan Gafarov');
    expect(fellowshipRight[0].name).toBe('Kumu Ramsay Taum');
    expect(fellowshipRight[9].name).toBe('Oscar Matzuwa');
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
  test('has 15 members', () => {
    expect(founders).toHaveLength(15);
    expect(founders.filter((f) => f.open)).toHaveLength(0);
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

  test('every member has a portrait, a role, and mostly links', () => {
    const members = founders.filter((f) => !f.open);
    members.forEach((m) => {
      expect(m.img).toMatch(/^\/assets\/people\/.+\.webp$/);
      expect((m.role ?? '').length).toBeGreaterThan(4);
    });
    expect(members.filter((m) => m.linkedin).length).toBeGreaterThanOrEqual(10);
  });
});
