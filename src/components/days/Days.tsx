import { GlowCard } from '../ui/GlowCard';
import { days, elements } from '../../lib/content';

/* §03 The Days — dark gradient section. Land header band, four element
   GlowCards, three day cards, the outcome box, and the ember connector
   stroke that runs from the outcome box down across the section seam to the
   compass tip in §04 (positioned every frame from live rects). z-index 3
   lifts the overflowing line above the light section below. */
export function Days() {
  return (
    <section
      id="the-days"
      style={{
        position: 'relative',
        zIndex: 3,
        background: 'var(--ground-days)',
        padding: '0 40px 116px',
      }}
    >
      <div
        data-reveal=""
        className="land-band"
        style={{ position: 'relative', margin: '0 -40px 78px', minHeight: '35vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}
      >
        <img
          src="/assets/img/land.jpg"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(21,19,42,0.34) 0%, rgba(21,19,42,0.2) 45%, rgba(21,19,42,0.88) 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: 0.06,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
            mixBlendMode: 'overlay',
          }}
        />
        <div className="land-copy" style={{ position: 'relative', zIndex: 2, padding: '32px 56px 42px', maxWidth: 902 }}>
          <div className="eye" style={{ color: 'var(--aniwa-gold)' }}>
            § 03 — The Work
          </div>
          <h2 className="disp" style={{ color: '#fff', fontSize: '3.8rem', margin: '18px 0 0' }}>
            The Work.
          </h2>
          <p
            className="bd"
            style={{
              color: 'rgba(255,255,255,0.82)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              lineHeight: 1.42,
              margin: '20px 0 0',
              maxWidth: 804,
            }}
          >
            A private reserve tucked amongst the savannah oak in Northern California will serve as solid ground for
            workshops, discussion panels, and mind-share in alignment with the four elements they serve to protect.
          </p>
        </div>
      </div>

      <div id="work-flow" style={{ position: 'relative', zIndex: 2 }}>
        <div data-reveal="" style={{ maxWidth: 1240, margin: '24px auto 0', textAlign: 'center' }}>
          <div className="grid-4e" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 34 }}>
            {elements.map((el) => (
              <GlowCard key={el.name} glowColor="ember" radius={10} border={1} style={{ display: 'block', height: '100%' }}>
                <div style={{ padding: '28px 20px 30px', textAlign: 'left' }}>
                  <div className="disp" style={{ fontSize: '2.6rem', color: 'var(--aniwa-terracotta)' }}>
                    {el.glyph}
                  </div>
                  <div className="eye" style={{ color: '#F4F1EB', letterSpacing: 'var(--tracking-glyph)', marginTop: 14 }}>
                    {el.name}
                  </div>
                  <p className="bd" style={{ color: 'rgba(244,241,235,0.62)', fontSize: '0.88rem', margin: '10px 0 0' }}>
                    {el.description}
                  </p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>

        <div
          id="day-cards"
          className="grid-3"
          style={{
            maxWidth: 1240,
            margin: '25px auto 0',
            position: 'relative',
            zIndex: 2,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 30,
          }}
        >
          {days.map((d) => (
            <div data-reveal="" key={d.number}>
              <GlowCard glowColor="ember" radius={14} style={{ display: 'block', height: '100%' }}>
                <div style={{ position: 'relative', zIndex: 1, borderRadius: 12, overflow: 'hidden', background: 'var(--card-inner-dark)' }}>
                  <div className="day-img" style={{ height: 230, overflow: 'hidden' }}>
                    <img src={d.img} alt="" width={400} height={230} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '28px 28px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                      <span className="disp" style={{ fontSize: '1.3rem', color: 'var(--aniwa-terracotta)' }}>
                        {d.number}
                      </span>
                      <span className="eye" style={{ color: 'rgba(244,241,235,0.44)', fontSize: '0.64rem' }}>
                        {d.date}
                      </span>
                    </div>
                    <h3 className="disp" style={{ fontSize: '1.7rem', color: '#F4F1EB', margin: '10px 0 0' }}>
                      {d.title}
                    </h3>
                    <p className="bd" style={{ color: 'rgba(244,241,235,0.72)', fontSize: '0.95rem', margin: '12px 0 0' }}>
                      {d.copy}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>

        <div data-outcome-box="" style={{ maxWidth: 640, margin: '54px auto 0' }}>
          <GlowCard glowColor="ember" radius={10} border={1} style={{ display: 'block' }}>
            <div style={{ padding: '32px 40px', textAlign: 'center' }}>
              <div className="eye" style={{ color: 'var(--aniwa-terracotta)', marginBottom: 13 }}>
                The outcome
              </div>
              <p className="disp" style={{ color: '#F4F1EB', fontSize: '1.7rem', lineHeight: 1.32, margin: 0 }}>
                You come knowing a few names,
                <br />
                and leave with marching orders.
              </p>
            </div>
          </GlowCard>
        </div>

        {/* Glowing connector: outcome box bottom -> compass tip in #apply. */}
        <div
          data-connector=""
          style={{ position: 'absolute', left: '50%', top: 1022, transform: 'translateX(-50%)', width: 3, zIndex: 6, pointerEvents: 'none' }}
        >
          <GlowCard
            glowColor="ember"
            radius={2}
            border={1}
            style={{
              display: 'block',
              background: 'transparent',
              boxShadow: 'none',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
            }}
          >
            <div
              data-connector-line=""
              style={{
                width: 3,
                height: 300,
                background:
                  'linear-gradient(180deg, rgba(160,74,42,0) 0%, rgba(160,74,42,0.5) 12%, rgba(160,74,42,0.5) 88%, rgba(160,74,42,0) 100%)',
              }}
            />
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
