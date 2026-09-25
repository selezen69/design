import { useState } from "react";
import { projects, projectTypes } from "../data/portfolio";
import { projectSubtitle } from "../utils/projectDisplay";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../hooks/useReveal";

/**
 * Асимметричная редакционная сетка (design-system.md §4, §7).
 * Раскладка задаётся позиционно (по индексу карточки в отфильтрованном
 * списке), а не по данным проекта — данные и порядок проектов не меняются.
 */
const LAYOUT = [
  { card: "lg:col-span-7", hero: true },
  { card: "lg:col-span-5 lg:col-start-8 lg:mt-20", hero: false },
  { card: "lg:col-span-5 lg:col-start-1", hero: false },
  { card: "lg:col-span-6 lg:col-start-7 lg:mt-16", hero: false },
];

export default function Portfolio({ onSelectProject, initialType = "all", id = "portfolio" }) {
  const [activeType, setActiveType] = useState(initialType);
  const [headerRef, headerVisible] = useReveal();

  const filtered =
    activeType === "all"
      ? projects
      : projects.filter((p) => p.type === activeType);

  return (
    <section id={id} className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20 ${REVEAL_TRANSITION} ${
            headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
        >
          <div>
            <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
              Работы
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-graphite font-light">
              Портфолио
            </h2>
          </div>

          {/* Filter */}
          <div className="flex gap-8">
            {projectTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => setActiveType(t.value)}
                className={`text-xs tracking-[0.3em] uppercase pb-1 border-b transition-colors duration-300 ${
                  activeType === t.value
                    ? "text-graphite border-graphite"
                    : "text-silver border-transparent hover:text-stone"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid — асимметричная, 12 колонок на lg, разные пропорции фото */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 lg:gap-x-10 gap-y-16 lg:gap-y-0">
          {filtered.map((project, i) => {
            const layout = LAYOUT[i % LAYOUT.length];
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                hero={layout.hero}
                className={layout.card}
                onClick={() => onSelectProject(project)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, hero, className, onClick }) {
  const [ref, visible] = useReveal();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      style={{ transitionDelay: `${Math.min(index, 3) * 100}ms` }}
      className={`group cursor-pointer ${className} ${REVEAL_TRANSITION} ${
        visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
      }`}
    >
      {/* Image — сохраняет исходную пропорцию, не обрезается в 4:3 */}
      <div className="relative overflow-hidden bg-fog">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="w-full h-auto block transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
        />

        {hero && (
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-graphite/80 via-graphite/10 to-transparent p-8">
            <p className="text-accent text-xs tracking-[0.3em] uppercase mb-2">
              {projectSubtitle(project)}
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-white font-light leading-tight">
              {project.title}
            </h3>
          </div>
        )}
      </div>

      {/* Info — только для стандартных карточек (у hero-карточки текст на фото) */}
      {!hero && (
        <div className="pt-7">
          <h3 className="font-serif text-2xl text-graphite font-light leading-tight transition-colors duration-500 group-hover:text-accent">
            {project.title}
          </h3>
          <p className="text-stone text-xs tracking-[0.15em] uppercase mt-2 leading-relaxed">
            {projectSubtitle(project)}
          </p>
        </div>
      )}
    </div>
  );
}
