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
 * Вариант B — редакционная колонка на тёмной сцене (ритм чередования
 * светлых/тёмных разделов — из варианта C, design-system.md §2).
 * Без фото (в проекте нет отдельного портрета дизайнера — семейное фото
 * убрано отовсюду на главной) и без статистики (цифры не подтверждены).
 */
export default function AboutB({ id = "about" } = {}) {
  const [ref, visible] = useReveal();
  const { lively } = useMotionMode();

  return (
    <section id={id} className="scroll-mt-24 md:scroll-mt-28 bg-graphite py-24 md:py-32">
      <div
        ref={ref}
        className={`max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <div className="lg:col-span-4">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">О студии</p>
          <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] text-white font-medium tracking-[0.01em]">
            {studio.name}
          </h2>
          {lively && <RevealLine visible={visible} delayMs={120} className="w-16 mt-4" />}
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <div className="space-y-5 text-silver/80 leading-relaxed text-lg columns-1 md:columns-2 md:gap-10">
            {studio.bio.map((paragraph, i) => (
              <p key={i} className="break-inside-avoid mb-5">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
