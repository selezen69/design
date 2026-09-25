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
 * Вариант C — портфолио как выставочная экспозиция: чередование тёмных и
 * светлых "стен", на каждой — свой формат работы (крупная / компактная /
 * широкоформатная), как в реальной галерее. Данные и порядок не меняются.
 */
const WALLS = [
  { kind: "large", theme: "dark" },
  { kind: "compact", theme: "light" },
  { kind: "wide", theme: "dark" },
  { kind: "compact", theme: "light" },
];

export default function PortfolioC({ onSelectProject, id = "portfolio" }) {
  const [activeType, setActiveType] = useState("all");

  const filtered =
    activeType === "all" ? projects : projects.filter((p) => p.type === activeType);

  return (
    <section id={id}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 md:px-16 py-8 bg-cream">
        <p className="text-stone text-xs tracking-[0.3em] uppercase">Экспозиция · Работы</p>
        <div className="flex gap-6">
          {projectTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveType(t.value)}
              className={`text-xs tracking-[0.3em] uppercase pb-1 border-b transition-colors duration-300 ${
                activeType === t.value
                  ? "text-graphite border-graphite"
                  : "text-stone/50 border-transparent hover:text-stone"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.map((project, i) => (
        <Wall
          key={project.id}
          project={project}
          index={i}
          total={filtered.length}
          wall={WALLS[i % WALLS.length]}
          onClick={() => onSelectProject(project)}
        />
      ))}
    </section>
  );
}

function Wall({ project, index, total, wall, onClick }) {
  const [ref, visible] = useReveal();
  const dark = wall.theme === "dark";

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  const label = (
    <p className={`text-xs tracking-[0.3em] uppercase mb-2 ${dark ? "text-accent" : "text-stone"}`}>
      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")} —{" "}
      {projectSubtitle(project)}
    </p>
  );
  const title = (
    <h3
      className={`font-serif font-light leading-tight ${
        dark ? "text-white" : "text-graphite"
      } ${wall.kind === "compact" ? "text-2xl" : "text-4xl md:text-5xl"}`}
    >
      {project.title}
    </h3>
  );

  if (wall.kind === "compact") {
    return (
      <div className={`${dark ? "bg-graphite" : "bg-cream"} py-24 md:py-32`}>
        <div
          ref={ref}
          className={`max-w-xs mx-auto px-6 text-center ${REVEAL_TRANSITION} ${
            visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
        >
          <div
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className="group cursor-pointer overflow-hidden bg-fog aspect-[3/4] mb-6 shadow-[0_30px_60px_-20px_rgba(26,26,26,0.25)]"
          >
            <img
              src={project.cover}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
          {label}
          {title}
        </div>
      </div>
    );
  }

  if (wall.kind === "wide") {
    return (
      <div
        ref={ref}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className={`group relative cursor-pointer bg-graphite aspect-[21/9] overflow-hidden ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite/80 via-graphite/10 to-transparent" />
        <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 md:px-16 max-w-md">
          {label}
          {title}
        </div>
      </div>
    );
  }

  // large
  return (
    <div
      ref={ref}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={`group relative cursor-pointer bg-graphite min-h-[90vh] overflow-hidden ${REVEAL_TRANSITION} ${
        visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
      }`}
    >
      <img
        src={project.cover}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-graphite/30" />
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-14 md:pb-20">
        {label}
        {title}
      </div>
    </div>
  );
}
