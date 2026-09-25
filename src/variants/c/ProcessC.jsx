import { STEPS } from "../../data/process";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант C — каталог этапов, как страницы выставочного буклета:
 * тёмная стена, огромные тихие номера слева, текст справа.
 */
export default function ProcessC({ id = "process" } = {}) {
  const [headerRef, headerVisible] = useReveal();

  return (
    <section id={id} className="bg-graphite py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <div
          ref={headerRef}
          className={`mb-16 ${REVEAL_TRANSITION} ${headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN}`}
        >
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">Как мы работаем</p>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] text-white font-medium tracking-[0.01em]">
            Этапы
          </h2>
        </div>

        <div className="space-y-0 divide-y divide-white/10">
          {STEPS.map((step, i) => (
            <Entry key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Entry({ step, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 3) * 90}ms` }}
      className={`grid grid-cols-[auto_1fr] md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-10 items-baseline ${REVEAL_TRANSITION} ${
        visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
      }`}
    >
      <span className="font-serif text-white/15 text-6xl md:text-8xl font-light leading-none">
        {step.num}
      </span>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
          <h3 className="font-serif text-2xl text-white font-light">{step.title}</h3>
          <p className="text-accent text-xs tracking-widest uppercase">{step.duration}</p>
        </div>
        <p className="text-silver/60 leading-relaxed max-w-lg">{step.description}</p>
      </div>
    </div>
  );
}
