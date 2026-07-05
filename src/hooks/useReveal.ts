import { useEffect } from 'react';

const FAILSAFE_MS = 3000;

/* Scroll-reveal for [data-reveal] elements, ported from the prototype.
   Hide-by-class (default visible): elements below 85% of the viewport at
   mount are armed (translated 28px down, opacity 0); an IntersectionObserver
   releases them, and a 3s failsafe reveals everything regardless — content
   can never be stuck hidden. */
export function useReveal(dep?: unknown): void {
  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const vh = window.innerHeight || document.documentElement.clientHeight;
    els.forEach((e) => {
      if (e.getBoundingClientRect().top > vh * 0.85) e.classList.add('reveal-armed');
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.remove('reveal-armed');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((e) => {
      if (e.classList.contains('reveal-armed')) io.observe(e);
    });

    const failsafe = setTimeout(() => {
      els.forEach((e) => e.classList.remove('reveal-armed'));
    }, FAILSAFE_MS);

    return () => {
      clearTimeout(failsafe);
      io.disconnect();
      els.forEach((e) => e.classList.remove('reveal-armed'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}
