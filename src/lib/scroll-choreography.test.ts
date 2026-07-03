import { describe, expect, test } from 'vitest';
import { clamp01, easeOutCubic, lerp, vis, SPIN_RATE, WEAVE_DONE_AT } from './scroll-choreography';

describe('clamp01', () => {
  test('clamps below zero to 0', () => {
    expect(clamp01(-3)).toBe(0);
  });
  test('clamps above one to 1', () => {
    expect(clamp01(1.5)).toBe(1);
  });
  test('passes through in-range values', () => {
    expect(clamp01(0.42)).toBe(0.42);
  });
});

describe('easeOutCubic', () => {
  test('starts at 0 and ends at 1', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
  });
  test('is front-loaded (faster than linear at midpoint)', () => {
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});

describe('lerp (progress through a range)', () => {
  test('returns 0 before the range and 1 after it', () => {
    expect(lerp(0.1, 0.3, 0.5)).toBe(0);
    expect(lerp(0.9, 0.3, 0.5)).toBe(1);
  });
  test('returns fractional progress inside the range', () => {
    expect(lerp(0.4, 0.3, 0.5)).toBeCloseTo(0.5);
  });
  test('degenerate range acts as a step function', () => {
    expect(lerp(0.29, 0.3, 0.3)).toBe(0);
    expect(lerp(0.31, 0.3, 0.3)).toBe(1);
  });
});

describe('vis (fade in / fade out window)', () => {
  test('fades in over [ia, ib]', () => {
    expect(vis(-0.2, -0.1, 0, 0.26, 0.34)).toBe(0);
    expect(vis(0.1, -0.1, 0, 0.26, 0.34)).toBe(1);
  });
  test('fades out over [oa, ob]', () => {
    expect(vis(0.3, -0.1, 0, 0.26, 0.34)).toBeCloseTo(0.5);
    expect(vis(0.4, -0.1, 0, 0.26, 0.34)).toBe(0);
  });
  test('no fade-out when oa/ob omitted', () => {
    expect(vis(0.99, 0.8, 0.88)).toBe(1);
  });
});

describe('choreography constants (prototype-locked)', () => {
  test('compass spin rate is 0.0032 rad per scrolled pixel', () => {
    expect(SPIN_RATE).toBe(0.0032);
  });
  test('weave draw completes at 85% of the pin', () => {
    expect(WEAVE_DONE_AT).toBe(0.85);
  });
});
