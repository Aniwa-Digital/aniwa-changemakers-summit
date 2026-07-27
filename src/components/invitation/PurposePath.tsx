import { steps } from '../../lib/content';
import { useStepTimeline } from '../../hooks/useStepTimeline';

const ACTIVATION = 0.5;

/* Scroll-driven four-step path — S-curve fills as you move down the page. */
export function PurposePath() {
  const timelineRef = useStepTimeline<HTMLDivElement>();

  return (
    <div
      ref={timelineRef}
      className="purpose-timeline"
      data-step-timeline-init=""
      data-step-timeline-activation={String(ACTIVATION)}
      aria-label="Path to the Summit"
    >
      <div className="purpose-timeline__header">
        <h3 className="disp purpose-timeline__title">Path to the Summit</h3>
      </div>

      <div className="purpose-timeline__wrapper" data-step-timeline-wrapper="">
        <svg className="purpose-timeline__curve" preserveAspectRatio="none" aria-hidden="true">
          <path className="purpose-timeline__track" data-step-timeline-track="" fill="none" />
          <path
            data-step-timeline-fill=""
            className="purpose-timeline__fill"
            fill="none"
            pathLength={1}
          />
        </svg>

        <div className="purpose-timeline__list" data-no-reveal="">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <div
                key={step.n}
                data-step-timeline-item=""
                className={`purpose-timeline__item purpose-timeline__item--${
                  isLast ? 'end' : i % 2 === 0 ? 'right' : 'left'
                }`}
              >
                <div className="purpose-timeline__content">
                  <h4 className="disp purpose-timeline__content-h">{step.label}</h4>
                </div>
                <div data-step-timeline-marker="" className="purpose-timeline__marker">
                  <span>{step.n.replace(/^0/, '')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
