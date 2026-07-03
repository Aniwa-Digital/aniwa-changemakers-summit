import { useEffect, useRef, useState } from 'react';
import type { Person, RosterSlot } from '../lib/content';
import {
  BUILDER_SLOTS,
  ROSTER_FADE_MS,
  ROSTER_SWAP_INTERVAL_MS,
  buildReserve,
  buildRosterSlots,
} from '../lib/content';
import { useReducedMotion } from './useReducedMotion';

/* §02 live roster: every ~2.2s one random BUILDER slot fades out (0.55s),
   swaps against a reserve pool, and fades back in. Keeper slots never change,
   preserving the Builder–Keeper–Builder row rhythm. Disabled under
   prefers-reduced-motion. */
export function useRosterSwap(): RosterSlot[] {
  const [slots, setSlots] = useState<RosterSlot[]>(buildRosterSlots);
  const reserveRef = useRef<Person[]>(buildReserve());
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const timeouts = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        timeouts.delete(t);
        fn();
      }, ms);
      timeouts.add(t);
    };

    const interval = setInterval(() => {
      const reserve = reserveRef.current;
      if (!reserve.length) return;
      const slot = BUILDER_SLOTS[Math.floor(Math.random() * BUILDER_SLOTS.length)];

      setSlots((prev) => prev.map((s, i) => (i === slot ? { ...s, op: 0 } : s)));

      later(() => {
        setSlots((prev) => {
          const outgoing = prev[slot];
          const ri = Math.floor(Math.random() * reserve.length);
          const incoming = reserve[ri];
          reserveRef.current = reserve.map((p, i) =>
            i === ri
              ? { name: outgoing.name, role: outgoing.role, img: outgoing.img, badge: outgoing.badge }
              : p,
          );
          return prev.map((s, i) => (i === slot ? { op: 0, ...incoming } : s));
        });
        later(() => {
          setSlots((prev) => prev.map((s, i) => (i === slot ? { ...s, op: 1 } : s)));
        }, 60);
      }, ROSTER_FADE_MS);
    }, ROSTER_SWAP_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [reduce]);

  return slots;
}
