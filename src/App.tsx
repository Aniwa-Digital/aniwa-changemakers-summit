import { useEffect, useState } from 'react';
import { Hero } from './components/hero/Hero';
import { Prophecy } from './components/prophecy/Prophecy';
import { Weaving } from './components/weaving/Weaving';
import { Room } from './components/room/Room';
import { Days } from './components/days/Days';
import { FoundersCircle } from './components/founders/FoundersCircle';
import { LoginModal, type LoginProvider } from './components/founders/LoginModal';
import { Invitation } from './components/invitation/Invitation';
import { Closing } from './components/closing/Closing';
import { RegisterPage } from './components/register/RegisterPage';
import { ApplyPage } from './components/register/ApplyPage';
import { AdminCodesPage } from './components/register/AdminCodesPage';
import { useReveal } from './hooks/useReveal';
import { startScrollChoreography } from './lib/scroll-choreography';

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
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginProvider, setLoginProvider] = useState<LoginProvider | null>(null);

  useEffect(() => {
    const onHash = () => {
      setRoute(currentRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useReveal(route);

  useEffect(() => {
    if (route !== 'home') return;
    return startScrollChoreography();
  }, [route]);

  if (route === 'register') return <RegisterPage />;
  if (route === 'apply') return <ApplyPage />;
  if (route === 'codes') return <AdminCodesPage />;

  return (
    <div style={{ position: 'relative', background: 'var(--ground-night)', overflowX: 'clip' }}>
      <main>
        <Hero
          onLoginOpen={() => {
            setLoginProvider(null);
            setLoginOpen(true);
          }}
        />
        <Prophecy />
        <Weaving />
        <Room />
        <Days />
        <FoundersCircle />
        <Invitation />
      </main>
      <Closing />
      <LoginModal
        open={loginOpen}
        provider={loginProvider}
        onClose={() => setLoginOpen(false)}
        onProvider={setLoginProvider}
      />
    </div>
  );
}
