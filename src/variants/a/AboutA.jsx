import { studio } from "../../data/studio";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант A — светлая "пауза" между тёмными сценами (design-system.md §2,
 * ритм тёмных/светлых сцен). Минимум элементов, много воздуха.
 */
export default function AboutA({ id = "about" } = {}) {
  const [ref, visible] = useReveal();

  return (
    <section id={id} className="bg-cream py-[140px] md:py-[220px]">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto px-6 text-center ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-8">О студии</p>
        <p className="font-serif text-[clamp(1.75rem,4vw,2.75rem)] text-graphite font-light leading-snug">
          {studio.bio[0]}
        </p>
        <div className="mt-16 flex items-center justify-center gap-16">
          {studio.stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl text-graphite font-light mb-1">{s.value}</div>
              <div className="text-xs text-stone uppercase tracking-[0.2em]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
