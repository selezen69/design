import { useState } from "react";
import { projects, projectTypes } from "../data/portfolio";

export default function Portfolio() {
  const [activeType, setActiveType] = useState("all");

  const filtered =
    activeType === "all"
      ? projects
      : projects.filter((p) => p.type === activeType);

  return (
    <section id="portfolio" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
              Работы
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-graphite font-light">
              Портфолио
            </h2>
          </div>

          {/* Filter */}
          <div className="flex gap-1">
            {projectTypes.map((t) => (
              <button
                key={t.value}
                onClick={() => setActiveType(t.value)}
                className={`px-5 py-2 text-xs tracking-widest uppercase transition-colors ${
                  activeType === t.value
                    ? "bg-graphite text-cream"
                    : "bg-fog text-stone hover:bg-beige"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }) {
  return (
    <div
      className={`group relative overflow-hidden bg-fog cursor-pointer ${
        featured ? "md:col-span-2 md:row-span-1" : ""
      }`}
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/30 transition-all duration-500" />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-serif text-xl text-graphite font-light mb-1">
              {project.title}
            </h3>
            <p className="text-stone text-sm">
              {project.location} · {project.area} м²
            </p>
          </div>
          <span className="text-xs tracking-widest text-silver uppercase mt-1">
            {project.year}
          </span>
        </div>
        <p className="text-stone text-sm mt-3 leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
}
