import { Suspense } from 'react';
import { Hero } from '../components/hero/Hero';
import { InviteCodeModal } from '../components/invitation/InviteCodeModal';
import { LazySection } from '../components/ui/LazySection';
import { lazyNamed } from '../lib/lazy-named';

const Prophecy = lazyNamed(() => import('../components/prophecy/Prophecy'), 'Prophecy');
const Weaving = lazyNamed(() => import('../components/weaving/Weaving'), 'Weaving');
const Room = lazyNamed(() => import('../components/room/Room'), 'Room');
const Days = lazyNamed(() => import('../components/days/Days'), 'Days');
const FoundersCircle = lazyNamed(() => import('../components/founders/FoundersCircle'), 'FoundersCircle');
const PurposeClosing = lazyNamed(() => import('../components/closing/PurposeClosing'), 'PurposeClosing');

const prophecyFallback = (
  <div id="prophecy" aria-hidden="true" style={{ minHeight: '100vh', background: 'var(--ground-light)' }} />
);

type HomeScrollProps = {
  inviteOpen: boolean;
  onInviteOpen: () => void;
  onInviteClose: () => void;
};

export function HomeScroll({ inviteOpen, onInviteOpen, onInviteClose }: HomeScrollProps) {
  return (
    <div style={{ position: 'relative', background: 'var(--ground-light)', overflowX: 'clip' }}>
      <main>
        <Hero onInviteOpen={onInviteOpen} />
        <Suspense fallback={prophecyFallback}>
          <Prophecy />
        </Suspense>
        <LazySection minHeight="120vh" className="lazy-section">
          <Suspense fallback={null}>
            <Weaving />
          </Suspense>
        </LazySection>
        <LazySection minHeight="80vh" className="lazy-section">
          <Suspense fallback={null}>
            <Room />
          </Suspense>
        </LazySection>
        <LazySection minHeight="100vh" className="lazy-section lazy-section--elements">
          <Suspense fallback={null}>
            <Days />
          </Suspense>
        </LazySection>
        <LazySection minHeight="90vh" className="lazy-section">
          <Suspense fallback={null}>
            <FoundersCircle />
          </Suspense>
        </LazySection>
        <LazySection minHeight="120vh" className="lazy-section lazy-section--purpose">
          <Suspense fallback={null}>
            <PurposeClosing onInviteOpen={onInviteOpen} />
          </Suspense>
        </LazySection>
      </main>
      <InviteCodeModal open={inviteOpen} onClose={onInviteClose} />
    </div>
  );
}
