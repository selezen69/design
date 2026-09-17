import { SERVICES } from "../../data/services";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";
import { useMotionMode } from "../../hooks/useMotionMode";
import RevealLine from "../shared/RevealLine";

/**
 * Вариант B — оглавление в стиле журнала: номер / название / точечный
 * лидер / цена, без карточек.
 */
export default function ServicesB({ id = "services" } = {}) {
  const [headerRef, headerVisible] = useReveal();
  const { lively } = useMotionMode();

  return (
    <section id={id} className="scroll-mt-24 md:scroll-mt-28 bg-fog py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div
          ref={headerRef}
          className={`mb-16 ${REVEAL_TRANSITION} ${headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN}`}
        >
          <p className="text-stone text-xs tracking-[0.3em] uppercase mb-3">Что я делаю</p>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] text-graphite font-medium tracking-[0.01em]">
            Услуги
          </h2>
          {lively && <RevealLine visible={headerVisible} delayMs={120} className="w-16 mt-4" />}
        </div>

        <div className="space-y-2">
          {SERVICES.map((s, i) => (
            <Entry key={s.num} service={s} index={i} lively={lively} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Entry({ service, index, lively }) {
  const [ref, visible] = useReveal();
  const baseDelay = Math.min(index, 3) * 90;

  return (
    <div
      ref={ref}
      tabIndex={lively ? 0 : undefined}
      style={{ transitionDelay: `${baseDelay}ms` }}
      className={`group px-3 -mx-3 rounded-sm outline-none ${REVEAL_TRANSITION} ${
        visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
      } ${
        lively
          ? "hover:bg-white/70 focus-visible:bg-white/70 focus-visible:ring-1 focus-visible:ring-accent/60"
          : ""
      }`}
    >
      <div className="flex items-baseline gap-4 py-4">
        <span
          style={
            lively
              ? {
                  transitionDelay: `${baseDelay + 90}ms`,
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(10px)",
                }
              : undefined
          }
          className={`text-sm shrink-0 ${
            lively
              ? "transition-[color,transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-stone group-hover:text-accent group-focus-visible:text-accent"
              : "text-stone"
          }`}
        >
          {service.num}
        </span>
        <h3 className="font-serif text-xl md:text-2xl text-graphite font-light">
          {service.title}
        </h3>
        <span className="flex-1 border-b border-dotted border-stone/40 translate-y-[-4px]" />
      </div>
      <p className="text-stone text-sm leading-relaxed pl-9 pb-4 max-w-xl">
        {service.description}
      </p>
    </div>
  );
}
