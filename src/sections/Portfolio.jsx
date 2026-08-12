import { useState } from "react";
import { projects, projectTypes } from "../data/portfolio";
import { projectSubtitle } from "../utils/projectDisplay";

export default function Portfolio({ onSelectProject, initialType = "all", id = "portfolio" }) {
  const [activeType, setActiveType] = useState(initialType);

  const filtered =
    activeType === "all"
      ? projects
      : projects.filter((p) => p.type === activeType);

  return (
    <section id={id} className="py-24 md:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-16 lg:gap-y-24">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => onSelectProject(project)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <div onClick={onClick} className="group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden bg-fog aspect-[4/3]">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035]"
        />
      </div>

      {/* Info */}
      <div className="pt-7">
        <h3 className="font-serif text-2xl text-graphite font-light leading-tight line-clamp-2 min-h-[4rem] transition-colors duration-500 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="text-stone text-xs tracking-[0.15em] uppercase mt-2 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {projectSubtitle(project)}
        </p>
      </div>
    </div>
  );
}
