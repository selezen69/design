import { STEPS } from "../../data/process";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";
import { useMotionMode } from "../../hooks/useMotionMode";
import RevealLine from "../shared/RevealLine";

/**
 * Вариант B — единственная тёмная "вставка" в преимущественно светлом
 * журнальном ритме (design-system.md §2, чередование сцен), горизонтальная
 * редакционная временная шкала с вертикальными разделителями колонок.
 */
export default function ProcessB({ id = "process" } = {}) {
  const [headerRef, headerVisible] = useReveal();
  const { lively } = useMotionMode();

  return (
    <section id={id} className="scroll-mt-24 md:scroll-mt-28 bg-graphite py-24 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div
          ref={headerRef}
          className={`mb-16 ${REVEAL_TRANSITION} ${headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN}`}
        >
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">Как мы работаем</p>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] text-white font-medium tracking-[0.01em]">
            Этапы
          </h2>
          {lively && <RevealLine visible={headerVisible} delayMs={120} className="w-16 mt-4 bg-accent/60" />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {STEPS.map((step, i) => (
            <Column key={step.num} step={step} index={i} lively={lively} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Column({ step, index, lively }) {
  const [ref, visible] = useReveal();
  const baseDelay = Math.min(index, 3) * 90;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${baseDelay}ms` }}
      className={`px-0 md:px-8 py-8 md:py-0 first:pl-0 ${REVEAL_TRANSITION} ${
        visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
      }`}
    >
      {/* Номера появляются с небольшим запаздыванием после названия этапа */}
      <p
        style={
          lively
            ? {
                transitionDelay: `${baseDelay + 90}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(10px)",
              }
            : undefined
        }
        className={`text-white/30 text-xs tracking-[0.3em] uppercase mb-6 ${
          lively ? "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" : ""
        }`}
      >
        {step.num}
      </p>
      <h3 className="font-serif text-xl text-white font-light mb-3">{step.title}</h3>
      <p className="text-silver/80 text-sm leading-relaxed">{step.description}</p>
    </div>
  );
}
