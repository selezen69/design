import { studio } from "../../data/studio";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант C — авторское высказывание на тёмной "стене" экспозиции.
 * Портрет уже показан в Hero — здесь только текст, крупной цитатой.
 */
export default function AboutC({ id = "about" } = {}) {
  const [ref, visible] = useReveal();

  return (
    <section id={id} className="bg-graphite py-24 md:py-36">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 md:px-16 ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-8">О студии</p>
        <p className="font-serif text-[clamp(1.75rem,4.5vw,3.25rem)] text-white font-light leading-snug">
          {studio.bio[0]}
        </p>
        <p className="mt-8 text-silver/60 text-base leading-relaxed max-w-2xl">
          {studio.bio[1]}
        </p>
        <div className="mt-16 flex items-center gap-16 border-t border-white/10 pt-10">
          {studio.stats.map((s) => (
            <div key={s.label}>
              <div className="font-serif text-3xl text-white font-light mb-1">{s.value}</div>
              <div className="text-xs text-silver/60 uppercase tracking-[0.2em]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
