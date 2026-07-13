import Lenis from 'lenis';

let lenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

export function scrollToTop(immediate = true): void {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo(0, 0);
}

/** Start Lenis smooth scroll. Returns a stop function. */
export function startSmoothScroll(onFrame?: () => void): () => void {
  const reduce =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    if (!onFrame) return () => {};
    onFrame();
    const onScroll = () => onFrame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }

  lenis = new Lenis({
    lerp: 0.15,
    smoothWheel: true,
    syncTouch: false,
  });

  document.documentElement.classList.add('lenis');

  let raf = 0;
  let running = true;
  let lastScroll = NaN;

  const tick = (time: number) => {
    if (!running) return;
    lenis!.raf(time);
    if (onFrame) {
      const y = lenis!.scroll;
      const moving = lenis!.isScrolling || Math.abs(y - lastScroll) > 0.25 || Number.isNaN(lastScroll);
      if (moving) {
        lastScroll = y;
        onFrame();
      }
    }
    raf = requestAnimationFrame(tick);
  };
  onFrame?.();
  raf = requestAnimationFrame(tick);

  const onResize = () => {
    lastScroll = NaN;
    onFrame?.();
  };
  window.addEventListener('resize', onResize);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    lenis?.destroy();
    lenis = null;
    document.documentElement.classList.remove('lenis');
  };
}
