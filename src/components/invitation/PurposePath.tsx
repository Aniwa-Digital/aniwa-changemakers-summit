import { RIVER_PATH_SRC, steps } from '../../lib/content';

/* Steps placed along the meandering river path — the white line is the
   journey; labels alternate to the left and right of each bend. */
export function PurposePath() {
  return (
    <div className="purpose-path" aria-label="Five steps to join the summit">
      <img className="purpose-path__river" src={RIVER_PATH_SRC} alt="" aria-hidden decoding="async" />

      {steps.map((step, i) => (
        <div
          key={step.n}
          className={`purpose-path__anchor purpose-path__anchor--${step.side}`}
          style={{ top: `${step.top}%` }}
        >
          <div
            className={`purpose-path__step purpose-path__step--${step.side}`}
            data-reveal=""
            style={{
              transitionDelay: `${i * 0.08}s`,
              ...(step.offset && step.side === 'left' ? { marginLeft: `-${step.offset}%` } : {}),
              ...(step.offset && step.side === 'right' ? { marginRight: `-${step.offset}%` } : {}),
            }}
          >
            <span className="purpose-path__num disp">{step.n}</span>
            <span className="purpose-path__label disp">{step.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
