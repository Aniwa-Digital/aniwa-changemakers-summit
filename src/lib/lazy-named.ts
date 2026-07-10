import { lazy, type ComponentType } from 'react';

/** React.lazy wrapper for modules that export named components. */
export function lazyNamed<P = object>(
  factory: () => Promise<Record<string, ComponentType<P>>>,
  name: string,
) {
  return lazy(() => factory().then((m) => ({ default: m[name] as ComponentType<P> })));
}
