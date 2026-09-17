import { useState } from "react";
import { projects, projectTypes } from "../../data/portfolio";
import { projectSubtitle } from "../../utils/projectDisplay";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант A — портфолио как последовательность крупных полноэкранных сцен.
 * Один проект = одна сцена на весь экран, название и категория — поверх
 * фотографии. Никакой карточной сетки.
 */
export default function PortfolioA({ onSelectProject, id = "portfolio" }) {
  const [activeType, setActiveType] = useState("all");

  const filtered =
    activeType === "all" ? projects : projects.filter((p) => p.type === activeType);

  return (
    <section id={id} className="relative bg-graphite">
      {/* Тонкий фильтр, закреплён сверху блока сцен */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-20 py-6 bg-gradient-to-b from-graphite/90 to-transparent">
        <p className="text-accent text-xs tracking-[0.4em] uppercase">Работы</p>
        <div className="flex gap-6">
          {projectTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveType(t.value)}
              className={`text-xs tracking-[0.3em] uppercase pb-1 border-b transition-colors duration-300 ${
                activeType === t.value
                  ? "text-cream border-cream"
                  : "text-silver/50 border-transparent hover:text-silver"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.map((project, i) => (
        <Scene
          key={project.id}
          project={project}
          index={i}
          total={filtered.length}
          onClick={() => onSelectProject(project)}
        />
      ))}
    </section>
  );
}

function Scene({ project, index, total, onClick }) {
  const [ref, visible] = useReveal({ threshold: 0.35 });

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
      className="group relative min-h-[100dvh] flex items-end overflow-hidden cursor-pointer"
    >
      <img
        src={project.cover}
        alt={project.title}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] ${REVEAL_TRANSITION}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-graphite/40" />

      <div
        className={`relative z-10 w-full px-6 md:px-20 pb-16 md:pb-24 flex items-end justify-between gap-8 ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <div>
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
            {projectSubtitle(project)}
          </p>
          <h3 className="font-serif text-[clamp(2rem,6vw,5rem)] text-white font-light leading-[1.02]">
            {project.title}
          </h3>
        </div>
        <p className="hidden md:block font-serif text-2xl text-silver/40 font-light shrink-0">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
