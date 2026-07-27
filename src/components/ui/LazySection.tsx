import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type LazySectionProps = {
  children: ReactNode;
  /** Reserved height before the section mounts (avoids layout shift). */
  minHeight?: number | string;
  /** IntersectionObserver root margin — load before the section enters view. */
  rootMargin?: string;
  className?: string;
  style?: CSSProperties;
};

/* Mount children only when the placeholder nears the viewport. */
export function LazySection({ children, minHeight, rootMargin = '320px 0px 480px 0px', className, style }: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setMounted(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        minHeight: mounted ? style?.minHeight : (minHeight ?? style?.minHeight),
      }}
    >
      {mounted ? children : null}
    </div>
  );
}
