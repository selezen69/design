import { studio } from "../../data/studio";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";
import { useMotionMode } from "../../hooks/useMotionMode";
import RevealLine from "../shared/RevealLine";

/**
 * Вариант B — редакционный портрет на тёмной сцене (ритм чередования
 * светлых/тёмных разделов — из варианта C, design-system.md §2).
 */
export default function AboutB({ id = "about" } = {}) {
  const [ref, visible] = useReveal();
  const { lively } = useMotionMode();

  return (
    <section id={id} className="scroll-mt-24 md:scroll-mt-28 bg-graphite py-24 md:py-32">
      <div
        ref={ref}
        className={`max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16 items-center ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <figure className="lg:col-span-5 max-w-[560px]">
          <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-white/5">
            <img
              src={studio.photo}
              alt="Дизайнер студии"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-graphite/35 to-transparent"
            />
          </div>
          <figcaption className="mt-3 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.28em] text-silver/45">
            <span className="h-px w-8 bg-accent/65" />
            Автор интерьеров
          </figcaption>
        </figure>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">О студии</p>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] text-white font-medium tracking-[0.01em]">
            {studio.name}
          </h2>
          {lively && <RevealLine visible={visible} delayMs={120} className="w-16 mt-4" />}
          <div className="mt-8 max-w-2xl space-y-5 text-silver/80 leading-relaxed text-lg">
            {studio.bio.map((paragraph, i) => (
              <p key={i}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
