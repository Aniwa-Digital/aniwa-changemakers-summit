import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

/** Custom magnifying-glass cursor over fellowship portraits (desktop pointer only). */
export function useWeavingScrambleCursor(
  sectionRef: RefObject<HTMLElement | null>,
  cursorRef: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    if (!section || !cursor) return;

    const fine =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    let mouseX = 0;
    let mouseY = 0;
    let hasMouseMoved = false;

    gsap.set(cursor, { x: 0, y: 0, xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });

    const updateCursor = () => {
      const under = document.elementFromPoint(mouseX, mouseY);
      const inSection = section.contains(under ?? document.body);
      const hoverItem = under?.closest('[data-cursor-hover]');

      if (!inSection || !hoverItem) {
        section.classList.remove('weaving-cursor-active');
        cursor.setAttribute('data-cursor', '');
        cursor.style.visibility = 'hidden';
        return;
      }

      cursor.style.visibility = 'visible';
      section.classList.add('weaving-cursor-active');
      cursor.setAttribute('data-cursor', 'active');
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      hasMouseMoved = true;
      xTo(mouseX);
      yTo(mouseY);
      requestAnimationFrame(updateCursor);
    };

    const onScroll = () => {
      if (!hasMouseMoved) return;
      requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      section.classList.remove('weaving-cursor-active');
      cursor.setAttribute('data-cursor', '');
      gsap.killTweensOf(cursor);
    };
  }, [sectionRef, cursorRef]);
}
