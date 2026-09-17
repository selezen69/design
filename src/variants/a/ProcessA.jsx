import { STEPS } from "../../data/process";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант A — вертикальная тихая хроника этапов, огромные приглушённые
 * номера, без коннекторов/декоративных линий.
 */
export default function ProcessA({ id = "process" } = {}) {
  const [headerRef, headerVisible] = useReveal();

  return (
    <section id={id} className="bg-graphite py-24 md:py-32 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 md:px-0">
        <div
          ref={headerRef}
          className={`mb-16 ${REVEAL_TRANSITION} ${headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN}`}
        >
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">Как мы работаем</p>
          <h2 className="text-2xl md:text-3xl text-white font-medium tracking-[0.01em]">Этапы</h2>
        </div>

        <div className="space-y-14">
          {STEPS.map((step, i) => (
            <Step key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ step, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 3) * 90}ms` }}
      className={`flex items-start gap-8 ${REVEAL_TRANSITION} ${
        visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
      }`}
    >
      <span className="font-serif text-white/10 text-6xl md:text-7xl font-light leading-none shrink-0">
        {step.num}
      </span>
      <div className="pt-2">
        <h3 className="font-serif text-xl text-white font-light mb-1">{step.title}</h3>
        <p className="text-accent text-xs tracking-widest uppercase mb-3">{step.duration}</p>
        <p className="text-silver/60 text-sm leading-relaxed max-w-md">{step.description}</p>
      </div>
    </div>
  );
}
