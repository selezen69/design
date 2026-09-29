import { useEffect, useRef, useState } from "react";
import { projectSubtitle } from "../utils/projectDisplay";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProjectDetail({ project, onClose }) {
  const dialogRef = useRef(null);
  const backButtonRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    backButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") {
          e.preventDefault();
          setLightboxIndex(null);
          return;
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setLightboxIndex((current) =>
            current === null ? null : (current - 1 + project.photos.length) % project.photos.length
          );
          return;
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          setLightboxIndex((current) =>
            current === null ? null : (current + 1) % project.photos.length
          );
          return;
        }
      } else if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose, lightboxIndex, project]);

  if (!project) return null;

  const hasMeta = Boolean(
    project.area || project.location || project.year || project.style,
  );
  const hasNarrative = Boolean(
    project.description || project.clientTask || project.materials,
  );

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-detail-title"
      className="fixed inset-0 z-[60] bg-cream overflow-y-auto"
    >
      {/* Close bar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-cream/95 backdrop-blur-sm border-b border-fog">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          <button
            ref={backButtonRef}
            onClick={onClose}
            className="text-sm tracking-wider text-stone hover:text-graphite transition-colors uppercase flex items-center gap-2"
          >
            ← Назад к портфолио
          </button>
          <a
            href="#contact"
            onClick={onClose}
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-graphite text-cream text-sm tracking-wider uppercase hover:bg-charcoal transition-colors"
          >
            Обсудить проект
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="relative pt-16 md:pt-20">
        <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] overflow-hidden">
          <img
            src={project.cover}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite/85 via-graphite/20 to-transparent sm:from-graphite/70 sm:via-graphite/10" />
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-8 sm:pb-10 w-full">
            <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
              {projectSubtitle(project)}
            </p>
            <h1
              id="project-detail-title"
              className="font-serif text-4xl md:text-6xl text-cream font-light"
            >
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta + description */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        {hasMeta && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 pb-12 border-b border-fog">
            {project.area && <Meta label="Площадь" value={`${project.area} м²`} />}
            {project.location && <Meta label="Местоположение" value={project.location} />}
            {project.year && <Meta label="Год" value={project.year} />}
            {project.style && <Meta label="Стиль" value={project.style} />}
          </div>
        )}

        {hasNarrative && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
            {project.description && (
              <div className="md:col-span-2">
                <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
                  Описание проекта
                </p>
                <p className="text-stone text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-8">
              {project.clientTask && (
                <div>
                  <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
                    Задача клиента
                  </p>
                  <p className="text-stone leading-relaxed">{project.clientTask}</p>
                </div>
              )}
              {project.materials && (
                <div>
                  <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
                    Материалы
                  </p>
                  <p className="text-stone leading-relaxed">{project.materials}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Gallery */}
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6">
          Галерея {project.photoCount ? `· ${project.photoCount} фото` : ""}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.photos.map((photo, i) => {
            const src = typeof photo === "string" ? photo : photo.src;
            const alt =
              typeof photo === "string"
                ? `${project.title} — фото ${i + 1}`
                : photo.alt;

            return (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group overflow-hidden bg-fog aspect-[4/3] cursor-zoom-in text-left"
                aria-label={`Открыть фото ${i + 1} из ${project.photos.length}`}
              >
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
                />
              </button>
            );
          })}
        </div>
      </div>

      {lightboxIndex !== null && (() => {
        const currentPhoto = project.photos[lightboxIndex];
        const currentSrc = typeof currentPhoto === "string" ? currentPhoto : currentPhoto.src;
        const currentAlt =
          typeof currentPhoto === "string"
            ? `${project.title} — фото ${lightboxIndex + 1}`
            : currentPhoto.alt;

        return (
          <div
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фотографии"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
              }}
              className="absolute top-5 right-5 md:top-7 md:right-8 z-20 text-white/80 hover:text-white text-sm tracking-[0.2em] uppercase px-3 py-2"
              aria-label="Закрыть увеличенное фото"
            >
              Закрыть ×
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex - 1 + project.photos.length) % project.photos.length);
              }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/30 text-white text-3xl flex items-center justify-center hover:bg-white/10"
              aria-label="Предыдущее фото"
            >
              ‹
            </button>

            <div
              className="max-w-[92vw] max-h-[88vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentSrc}
                alt={currentAlt}
                className="max-w-[92vw] max-h-[82vh] object-contain select-none"
              />
              <div className="mt-4 text-white/65 text-xs tracking-[0.25em] uppercase">
                {String(lightboxIndex + 1).padStart(2, "0")} / {String(project.photos.length).padStart(2, "0")}
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((lightboxIndex + 1) % project.photos.length);
              }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-14 md:h-14 rounded-full border border-white/30 text-white text-3xl flex items-center justify-center hover:bg-white/10"
              aria-label="Следующее фото"
            >
              ›
            </button>
          </div>
        );
      })()}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-xs tracking-widest text-silver uppercase mb-1">{label}</p>
      <p className="text-graphite font-serif text-xl font-light">{value}</p>
    </div>
  );
}
