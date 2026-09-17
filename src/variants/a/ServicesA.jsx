import { SERVICES } from "../../data/services";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант A — тихий одноколоночный список вместо карточной сетки,
 * крупные тонкие номера, минимум декора.
 */
export default function ServicesA({ id = "services" } = {}) {
  const [headerRef, headerVisible] = useReveal();

  return (
    <section id={id} className="bg-graphite py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-0">
        <div
          ref={headerRef}
          className={`mb-16 ${REVEAL_TRANSITION} ${headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN}`}
        >
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">Что я делаю</p>
          <h2 className="text-2xl md:text-3xl text-white font-medium tracking-[0.01em]">Услуги</h2>
        </div>

        <div className="divide-y divide-white/10">
          {SERVICES.map((s, i) => (
            <Row key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ service, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 3) * 90}ms` }}
      className={`flex flex-col md:flex-row md:items-baseline gap-3 md:gap-10 py-8 ${REVEAL_TRANSITION} ${
        visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
      }`}
    >
      <span className="font-serif text-silver/40 text-xl font-light shrink-0 w-10">
        {service.num}
      </span>
      <h3 className="font-serif text-2xl text-white font-light shrink-0 md:w-64">
        {service.title}
      </h3>
      <p className="text-silver/60 text-sm leading-relaxed flex-1">{service.description}</p>
      <span className="text-accent text-sm tracking-wide shrink-0">{service.price}</span>
    </div>
  );
}
