import { useEffect } from 'react';

const REVEAL_INSET = 0.04;
const STAGGER_STEP_MS = 35;
const STAGGER_MAX_MS = 180;
const PAGE_BOTTOM_SLACK = 64;
const MO_DEBOUNCE_MS = 120;
const REVEAL_SCOPES = ['main', '#closing'];
const IO_ROOT_MARGIN = `-${REVEAL_INSET * 100}% 0px -${REVEAL_INSET * 100}% 0px`;

const SKIP_ANCESTORS = [
  '#hero',
  '#prophecy',
  'nav',
  '[role="dialog"]',
  '.element-card__panel',
  '.element-card--open',
  '.helix-seat',
  '.founders-interactive',
  '[data-no-reveal]',
].join(', ');

const TEXT_SELECTOR = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', '.disp', '.myth', '.bd', '.eye'].join(', ');

const CARD_SELECTOR = [
  '.element-slot',
  '.grid-stats > div',
  '.grid-logos img',
  '[data-connector-anchor]',
  '.purpose-timeline__item',
  '.founder-seat',
].join(', ');

function withinScope(el: Element): boolean {
  return REVEAL_SCOPES.some((sel) => el.closest(sel));
}

function shouldSkip(el: HTMLElement): boolean {
  if (!withinScope(el)) return true;
  if (el.closest(SKIP_ANCESTORS)) return true;
  if (el.closest('button, a.ember, a.ghost, .nav-login, .nav-burger')) return true;
  if (el.tagName === 'BUTTON' || el.tagName === 'A') return true;

  const block = el.closest('[data-reveal]');
  if (block && block !== el) return true;

  const card = el.closest(CARD_SELECTOR);
  if (card && card !== el) return true;

  return false;
}

function markAuto(el: HTMLElement) {
  if (!el.hasAttribute('data-reveal-auto')) {
    el.setAttribute('data-reveal-auto', '');
  }
}

function collectElements(): HTMLElement[] {
  const set = new Set<HTMLElement>();

  REVEAL_SCOPES.forEach((scopeSel) => {
    const scope = document.querySelector(scopeSel);
    if (!scope) return;

    scope.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => set.add(el));

    scope.querySelectorAll<HTMLElement>('#hero .hero-copy > *').forEach((el) => {
      if (shouldSkip(el)) return;
      markAuto(el);
      set.add(el);
    });

    scope.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((el) => {
      if (shouldSkip(el)) return;
      markAuto(el);
      set.add(el);
    });

    scope.querySelectorAll<HTMLElement>(CARD_SELECTOR).forEach((el) => {
      if (shouldSkip(el)) return;
      markAuto(el);
      set.add(el);
    });
  });

  return Array.from(set);
}

function applyStagger(els: HTMLElement[]) {
  const byGroup = new Map<Element | null, HTMLElement[]>();

  els.forEach((el) => {
    if (!el.hasAttribute('data-reveal-auto')) return;

    let group: Element | null;
    if (el.closest('#hero .hero-copy')) {
      group = document.querySelector('#hero .hero-copy');
    } else if (el.matches(CARD_SELECTOR)) {
      group =
        el.closest(
          '.elements-diamond, .grid-stats, .grid-logos, .purpose-timeline__list, .founders-interactive',
        ) ?? el.parentElement;
    } else {
      group =
        el.closest('.elements-diamond, .grid-stats, .grid-logos, .purpose-timeline__list, .founders-interactive') ??
        el.closest('section');
    }

    if (!byGroup.has(group)) byGroup.set(group, []);
    byGroup.get(group)!.push(el);
  });

  byGroup.forEach((group) => {
    group.forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${Math.min(i * STAGGER_STEP_MS, STAGGER_MAX_MS)}ms`);
    });
  });
}

function nearPageBottom(vh: number): boolean {
  return window.scrollY + vh >= document.documentElement.scrollHeight - PAGE_BOTTOM_SLACK;
}

function setRevealed(el: HTMLElement, revealed: boolean) {
  const armed = el.classList.contains('reveal-armed');
  if (revealed && armed) el.classList.remove('reveal-armed');
  else if (!revealed && !armed) el.classList.add('reveal-armed');
}

/* Scroll-reveal for headers, body copy, cards, and [data-reveal] blocks.
   IntersectionObserver drives visibility; DOM is rescanned only when sections mount. */
export function useReveal(active = true): void {
  useEffect(() => {
    if (!active) return;

    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let io: IntersectionObserver | null = null;
    let moTimer = 0;
    let bottomRaf = 0;
    let primed = false;
    let tracked = new Set<HTMLElement>();

    const onIntersect: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        setRevealed(entry.target as HTMLElement, entry.isIntersecting);
      }
    };

    const bind = () => {
      const els = collectElements();
      applyStagger(els);

      if (!primed) {
        primed = true;
        els.forEach((el) => el.classList.add('reveal-armed'));
      } else {
        for (const el of els) {
          if (!tracked.has(el)) el.classList.add('reveal-armed');
        }
      }

      io?.disconnect();
      tracked = new Set(els);

      if (els.length === 0) return;

      io = new IntersectionObserver(onIntersect, {
        root: null,
        rootMargin: IO_ROOT_MARGIN,
        threshold: 0,
      });

      for (const el of els) io.observe(el);
    };

    const scheduleBind = () => {
      window.clearTimeout(moTimer);
      moTimer = window.setTimeout(bind, MO_DEBOUNCE_MS);
    };

    const onScrollBottom = () => {
      if (!nearPageBottom(window.innerHeight || document.documentElement.clientHeight)) return;
      cancelAnimationFrame(bottomRaf);
      bottomRaf = requestAnimationFrame(() => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        for (const el of tracked) {
          if (!el.classList.contains('reveal-armed')) continue;
          const top = el.getBoundingClientRect().top;
          if (top < vh + PAGE_BOTTOM_SLACK) el.classList.remove('reveal-armed');
        }
      });
    };

    bind();

    const observeRoot = document.querySelector('main')?.parentElement ?? document.body;
    const mo =
      typeof MutationObserver !== 'undefined'
        ? new MutationObserver(scheduleBind)
        : null;

    mo?.observe(observeRoot, { childList: true, subtree: true });
    window.addEventListener('scroll', onScrollBottom, { passive: true });

    return () => {
      window.clearTimeout(moTimer);
      cancelAnimationFrame(bottomRaf);
      io?.disconnect();
      mo?.disconnect();
      window.removeEventListener('scroll', onScrollBottom);
      document.querySelectorAll('[data-reveal-auto]').forEach((el) => {
        el.removeAttribute('data-reveal-auto');
        el.classList.remove('reveal-armed');
      });
      document.querySelectorAll('[data-reveal].reveal-armed').forEach((el) => {
        el.classList.remove('reveal-armed');
      });
    };
  }, [active]);
}
