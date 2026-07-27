import { Suspense, useEffect, useState } from 'react';
import { signalHeroCompassResize } from './lib/compass-svg';
import { useReveal } from './hooks/useReveal';
import { lazyNamed } from './lib/lazy-named';
import { scrollToTop, startSmoothScroll } from './lib/smooth-scroll';
import { tickScrollChoreography } from './lib/scroll-choreography';
import { HomeScroll } from './pages/HomeScroll';

const RegisterPage = lazyNamed(() => import('./components/register/RegisterPage'), 'RegisterPage');
const ApplyPage = lazyNamed(() => import('./components/register/ApplyPage'), 'ApplyPage');
const AdminCodesPage = lazyNamed(() => import('./components/register/AdminCodesPage'), 'AdminCodesPage');

/* Tiny hash router: '#/register' (invite-gated registration), '#/apply'
   (open application) and '#/codes' (team invite-code generator) render as
   standalone pages; anything else renders the main scroll page. */
function currentRoute(): 'register' | 'apply' | 'codes' | 'home' {
  const h = window.location.hash;
  if (h.startsWith('#/register')) return 'register';
  if (h.startsWith('#/apply')) return 'apply';
  if (h.startsWith('#/codes')) return 'codes';
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState(currentRoute);
  const [inviteOpen, setInviteOpen] = useState(false);

  useReveal(true);

  useEffect(() => {
    const onHash = () => {
      setRoute(currentRoute());
      scrollToTop(true);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (route !== 'home') return;
    signalHeroCompassResize();
    const t = window.setTimeout(signalHeroCompassResize, 120);
    return () => window.clearTimeout(t);
  }, [route]);

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (route !== 'home') {
      return startSmoothScroll();
    }

    return startSmoothScroll(() => {
      tickScrollChoreography(reduce);
    });
  }, [route]);

  if (route === 'register') {
    return (
      <Suspense fallback={null}>
        <RegisterPage />
      </Suspense>
    );
  }
  if (route === 'apply') {
    return (
      <Suspense fallback={null}>
        <ApplyPage />
      </Suspense>
    );
  }
  if (route === 'codes') {
    return (
      <Suspense fallback={null}>
        <AdminCodesPage />
      </Suspense>
    );
  }

  return (
    <HomeScroll
      inviteOpen={inviteOpen}
      onInviteOpen={() => setInviteOpen(true)}
      onInviteClose={() => setInviteOpen(false)}
    />
  );
}
