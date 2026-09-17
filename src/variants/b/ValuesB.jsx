import { VALUES } from "../../data/values";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";
import { useMotionMode } from "../../hooks/useMotionMode";
import RevealLine from "../shared/RevealLine";

/**
 * Вариант B — «Что ценят наши клиенты». Редакционная композиция вместо
 * раздела "Отзывы": позиция студии, без вымышленных клиентов, цитат, фото/
 * аватаров и оценок в звёздах. Четыре пункта — не четыре одинаковые тяжёлые
 * карточки, а список в духе журнальной колонки принципов.
 */
export default function ValuesB({ id = "values" } = {}) {
  const [headerRef, headerVisible] = useReveal();
  const { lively } = useMotionMode();

  return (
    <section id={id} className="scroll-mt-24 md:scroll-mt-28 bg-beige py-24 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div
          ref={headerRef}
          className={`max-w-xl mb-16 md:mb-20 ${REVEAL_TRANSITION} ${
            headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
        >
          <p className="text-stone text-xs tracking-[0.3em] uppercase mb-3">Позиция студии</p>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] text-graphite font-medium tracking-[0.01em]">
            Что ценят наши клиенты
          </h2>
          {lively && <RevealLine visible={headerVisible} delayMs={120} className="w-16 mt-4" />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
          {VALUES.map((v, i) => (
            <Item key={v.num} value={v} index={i} lively={lively} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ value, index, lively }) {
  const [ref, visible] = useReveal();
  const baseDelay = Math.min(index, 3) * 90;

  return (
    <div
      ref={ref}
      tabIndex={lively ? 0 : undefined}
      style={{ transitionDelay: `${baseDelay}ms` }}
      className={`flex gap-6 py-8 px-3 -mx-3 border-t border-graphite/15 outline-none ${REVEAL_TRANSITION} ${
        visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
      } ${
        lively
          ? "group hover:bg-white/50 focus-visible:bg-white/50 focus-visible:ring-1 focus-visible:ring-accent/60"
          : ""
      }`}
    >
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
        className={`font-serif text-3xl text-accent/70 font-light shrink-0 ${
          lively
            ? "transition-[color,transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-accent group-focus-visible:text-accent"
            : ""
        }`}
      >
        {value.num}
      </span>
      <div>
        <h3 className="text-sm tracking-[0.1em] uppercase text-graphite font-medium mb-2">
          {value.title}
        </h3>
        <p className="text-stone leading-relaxed">{value.description}</p>
      </div>
    </div>
  );
}
