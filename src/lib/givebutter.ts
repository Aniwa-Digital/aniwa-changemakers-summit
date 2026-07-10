export const GIVEBUTTER_WIDGET_ID = 'L0yY0Q';

const GIVEBUTTER_SCRIPT = 'https://widgets.givebutter.com/latest.umd.cjs?acct=q5TCBcijePWQ6jsd&p=other';

let loadPromise: Promise<void> | null = null;

/** Load Givebutter only when the registration ticket step is shown. */
export function loadGivebutterScript(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve();
  if (document.querySelector(`script[src="${GIVEBUTTER_SCRIPT}"]`)) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = GIVEBUTTER_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Givebutter script failed to load'));
    document.head.appendChild(script);
  });
  return loadPromise;
}
