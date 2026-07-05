import { GlowCard } from '../ui/GlowCard';
import { elements } from '../../lib/content';

/* The Work → "Four Elements — One Mission". Land header band, an epic
   stacked quartet (topic areas huge, element words small), a Mind + Body +
   Planet overview, the outcome box, and the ember connector stroke that
   runs from the outcome box down across the section seam to the compass
   tip in the Founders Circle (positioned every frame from live rects). */
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
        <div className="land-copy" style={{ position: 'relative', zIndex: 2, padding: '32px 56px 42px', maxWidth: 980 }}>
          <h2 className="disp" style={{ color: '#fff', fontSize: '3.8rem', margin: 0 }}>
            Four Elements — One Mission.
          </h2>
        </div>
      </div>

      <div id="work-flow" style={{ position: 'relative', zIndex: 2 }}>
        {/* The elemental quartet: topic areas carry the size; the element
            words sit small above them; the glyph burns faint behind. */}
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          {elements.map((el, i) => (
            <div
              key={el.name}
              data-reveal=""
              className="element-row"
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: 'minmax(120px, 220px) 1fr',
                gap: 28,
                alignItems: 'center',
                padding: '52px 8px',
                borderTop: '1px solid rgba(244,241,235,0.14)',
                borderBottom: i === elements.length - 1 ? '1px solid rgba(244,241,235,0.14)' : 'none',
                overflow: 'hidden',
              }}
            >
              <div
                aria-hidden="true"
                className="disp"
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '11rem',
                  lineHeight: 1,
                  color: 'var(--aniwa-terracotta)',
                  opacity: 0.1,
                  pointerEvents: 'none',
                }}
              >
                {el.glyph}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <span className="disp" style={{ fontSize: '1.5rem', color: 'var(--aniwa-terracotta)', lineHeight: 1 }}>
                  {el.glyph}
                </span>
                <span className="eye" style={{ color: 'var(--aniwa-gold)', letterSpacing: 'var(--tracking-glyph)' }}>
                  {el.name}
                </span>
              </div>
              <h3
                className="disp element-topic"
                style={{
                  position: 'relative',
                  color: '#F4F1EB',
                  fontSize: 'clamp(1.7rem, 3.4vw, 3rem)',
                  lineHeight: 1.16,
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                {el.description.replace(/\.$/, '')}
              </h3>
            </div>
          ))}
        </div>

        {/* What to expect: Mind + Body + Planet */}
        <div data-reveal="" style={{ maxWidth: 880, margin: '84px auto 0', textAlign: 'center' }}>
          <div className="eye" style={{ color: 'var(--aniwa-gold)' }}>
            What to expect
          </div>
          <h3 className="disp" style={{ color: '#F4F1EB', fontSize: 'clamp(2rem, 4vw, 3.2rem)', margin: '18px 0 0' }}>
            Mind&nbsp;+&nbsp;Body&nbsp;+&nbsp;Planet
          </h3>
          <p
            className="bd"
            style={{
              color: 'rgba(255,255,255,0.78)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              lineHeight: 1.46,
              margin: '20px auto 0',
              maxWidth: 760,
            }}
          >
            Workshops, discussion panels, and mind-share and heart presence in alignment with the four elements they
            serve to protect — on a private reserve tucked amongst the savannah oak of Sonoma County, California.
          </p>
        </div>

        <div data-outcome-box="" style={{ maxWidth: 640, margin: '64px auto 0' }}>
          <GlowCard glowColor="ember" radius={10} border={1} style={{ display: 'block' }}>
            <div style={{ padding: '32px 40px', textAlign: 'center' }}>
              <div className="eye" style={{ color: 'var(--aniwa-terracotta)', marginBottom: 13 }}>
                The outcome
              </div>
              <p className="disp" style={{ color: '#F4F1EB', fontSize: '1.7rem', lineHeight: 1.32, margin: 0 }}>
                You come knowing some names,
                <br />
                you leave with a shared mission.
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
