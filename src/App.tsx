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
import { useReveal } from './hooks/useReveal';
import { startScrollChoreography } from './lib/scroll-choreography';

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginProvider, setLoginProvider] = useState<LoginProvider | null>(null);

  useReveal();

  useEffect(() => startScrollChoreography(), []);

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
