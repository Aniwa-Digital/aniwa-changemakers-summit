export const COMPASS_LAYERS_SRC = '/assets/compass/compass-layers.svg';

let layersPromise: Promise<string> | null = null;

/** Shared fetch for hero overlay — one network request. */
export function loadCompassLayersSvg(): Promise<string> {
  if (!layersPromise) {
    layersPromise = fetch(COMPASS_LAYERS_SRC)
      .then((r) => {
        if (!r.ok) throw new Error(`compass layers failed: ${r.status}`);
        return r.text();
      })
      .catch((err) => {
        layersPromise = null;
        throw err;
      });
  }
  return layersPromise;
}

/** Nudge WebGL + layout after hero mounts or resizes. */
export function signalHeroCompassResize(): void {
  window.dispatchEvent(new Event('hero-compass-resize'));
}
