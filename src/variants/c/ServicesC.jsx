import { SERVICES } from "../../data/services";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант C — услуги как таблички экспоната: номер, название заглавными,
 * описание курсивом, на светлой "стене".
 */
export default function ServicesC({ id = "services" } = {}) {
  const [headerRef, headerVisible] = useReveal();

  return (
    <section id={id} className="bg-cream py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div
          ref={headerRef}
          className={`mb-16 text-center ${REVEAL_TRANSITION} ${
            headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
        >
          <p className="text-stone text-xs tracking-[0.4em] uppercase mb-3">Что я делаю</p>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] text-graphite font-medium tracking-[0.01em]">
            Услуги
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6">
          {SERVICES.map((s, i) => (
            <Placard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Placard({ service, index }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${Math.min(index, 3) * 90}ms` }}
      className={`text-center border-t border-graphite/20 pt-6 ${REVEAL_TRANSITION} ${
        visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
      }`}
    >
      <p className="text-stone text-xs tracking-[0.3em] mb-3">{service.num}</p>
      <h3 className="text-sm tracking-[0.15em] uppercase text-graphite font-medium mb-4">
        {service.title}
      </h3>
      <p className="font-serif italic text-stone text-base leading-relaxed mb-4">
        {service.description}
      </p>
      <div className="text-accent text-xs tracking-[0.2em] uppercase">{service.price}</div>
    </div>
  );
}
