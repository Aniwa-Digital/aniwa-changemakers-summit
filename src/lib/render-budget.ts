/* Shared GPU budget helpers for the three WebGL scenes (hero compass shader,
   prophecy cosmic scene, closing fire sphere). Small screens get a lower
   device-pixel-ratio cap and lighter scenes; offscreen scenes stop their
   requestAnimationFrame loops entirely. */

export function isSmallScreen(): boolean {
  return (
    typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 768px)').matches
  );
}

/** Max device-pixel-ratio a scene should render at. */
export function dprCap(): number {
  return isSmallScreen() ? 1.5 : 2;
}

/** Star count per starfield layer (CosmicScene). */
export function starBudget(): number {
  return isSmallScreen() ? 1200 : 2500;
}

/** Calls back with visibility so offscreen scenes can pause their render
    loops. Returns a cleanup function. The 80px margin restarts a scene just
    before it scrolls into view so there is no visible pop-in. */
export function observeVisibility(el: Element, cb: (visible: boolean) => void): () => void {
  if (typeof IntersectionObserver !== 'function') return () => {};
  const io = new IntersectionObserver(
    (entries) => cb(entries[entries.length - 1].isIntersecting),
    { rootMargin: '80px' },
  );
  io.observe(el);
  return () => io.disconnect();
}
