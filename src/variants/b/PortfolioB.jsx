import { useState } from "react";
import { projects, projectTypes } from "../../data/portfolio";
import { projectSubtitle } from "../../utils/projectDisplay";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";
import { useMotionMode } from "../../hooks/useMotionMode";
import { useParallax } from "../../hooks/useParallax";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import RevealLine from "../shared/RevealLine";

/**
 * Вариант B — портфолио как редакционные развороты: текст и фото чередуются
 * слева/справа, у каждого проекта — своя реальная пропорция фото (не 4:3).
 * Вся зона разворота — один кликабельный/фокусируемый элемент (не три
 * отдельных таб-стопа на одно и то же действие). Раскладка задаётся
 * позиционно (по индексу), данные/порядок проектов не меняются.
 *
 * "Спокойно" и "Живее" (useMotionMode) сознательно РАЗНЫЕ, не вариации
 * одного и того же:
 *  - Спокойно: фото — короткий fade + подъём 14px/650ms, без масштаба и
 *    параллакса; текстовый блок — как единое целое, 24px/800ms (текущее
 *    мягкое появление, без изменений).
 *  - Живее: фото — подъём 38px + одновременный scale(1.045→1) за
 *    1100–1150ms, следом номер → название → описание → ссылка с шагом
 *    ~120ms; лёгкий параллакс до 20px; соседние карточки входят с разных
 *    сторон (на desktop; на mobile — всегда вертикально, иначе
 *    горизонтальный скролл).
 * useReveal сам переигрывает состояние при смене режима для элементов,
 * которые сейчас в зоне видимости — здесь достаточно читать `visible`.
 */
const SPREADS = [
  { imageOverride: null, ratio: "lg:aspect-[3/2]", textCol: "lg:col-start-8 lg:col-span-5", photoCol: "lg:col-start-1 lg:col-span-6" },
  { imageOverride: "/projects/zelenyi-mys/photo-01.jpg", ratio: "lg:aspect-[3/2]", textCol: "lg:col-start-1 lg:col-span-5", photoCol: "lg:col-start-7 lg:col-span-6" },
  { imageOverride: null, ratio: "lg:aspect-[3/2]", textCol: "lg:col-start-8 lg:col-span-5", photoCol: "lg:col-start-1 lg:col-span-5" },
  { imageOverride: null, ratio: "lg:aspect-[3/2]", textCol: "lg:col-start-1 lg:col-span-5", photoCol: "lg:col-start-7 lg:col-span-6" },
];

const PHOTO_MAGNITUDE = 38; // px — "Живее": 36–40px

export default function PortfolioB({ onSelectProject, id = "portfolio" }) {
  const [activeType, setActiveType] = useState("all");
  const [headerRef, headerVisible] = useReveal();
  const { lively } = useMotionMode();

  const filtered =
    activeType === "all" ? projects : projects.filter((p) => p.type === activeType);

  return (
    <section id={id} className="scroll-mt-24 md:scroll-mt-28 bg-cream py-24 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div
          ref={headerRef}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28 pb-8 border-b border-stone/20 ${REVEAL_TRANSITION} ${
            headerVisible ? REVEAL_VISIBLE : REVEAL_HIDDEN
          }`}
        >
          <div>
            <p className="text-stone text-xs tracking-[0.3em] uppercase mb-3">Работы</p>
            <h2 className="text-[clamp(1.5rem,3.2vw,2.25rem)] text-graphite font-medium tracking-[0.01em]">
              Портфолио
            </h2>
            {lively && <RevealLine visible={headerVisible} delayMs={120} className="w-16 mt-4" />}
          </div>
          <div className="flex gap-8">
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

        <div className="space-y-20 md:space-y-32">
          {filtered.map((project, i) => (
            <Spread
              key={project.id}
              project={project}
              index={i}
              total={filtered.length}
              spread={SPREADS[i % SPREADS.length]}
              onClick={() => onSelectProject(project)}
              lively={lively}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Стиль элементов текстового каскада в режиме "Живее". */
function liveChildStyle({ visible, direction, delayMs }) {
  const hiddenTransform =
    direction === "y"
      ? `translateY(${PHOTO_MAGNITUDE}px)`
      : `translateX(${direction === "x-left" ? -PHOTO_MAGNITUDE : PHOTO_MAGNITUDE}px)`;
  return {
    transitionDelay: `${delayMs}ms`,
    transform: visible ? "translateY(0) translateX(0)" : hiddenTransform,
    opacity: visible ? 1 : 0,
  };
}
const LIVE_CHILD_TRANSITION =
  "transition-[transform,opacity] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
const LIVE_STAGGER_STEP = 120; // ms — "около 120ms" между номером/названием/описанием/ссылкой

function Spread({ project, index, total, spread, onClick, lively }) {
  const [ref, visible] = useReveal();
  const isDesktop = useIsDesktop();
  // Чередование влево/вправо имеет смысл только в двухколоночной desktop-
  // раскладке — на мобильной полноширинной колонке translateX уводил бы
  // контент за пределы экрана (горизонтальный скролл), поэтому там вход
  // всегда вертикальный.
  const direction = !isDesktop
    ? "y"
    : index % 2 === 0
      ? "y"
      : index % 4 === 1
        ? "x-left"
        : "x-right";
  const baseDelay = Math.min(index, 3) * 60;
  const [parallaxRef, parallaxOffset] = useParallax(lively, 20);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  const photoHiddenTransform =
    direction === "y"
      ? `translateY(${PHOTO_MAGNITUDE}px)`
      : `translateX(${direction === "x-left" ? -PHOTO_MAGNITUDE : PHOTO_MAGNITUDE}px)`;

  return (
    <div
      ref={ref}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Открыть проект «${project.title}»`}
      style={lively ? undefined : { transitionDelay: `${Math.min(index, 3) * 100}ms` }}
      className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 lg:items-center cursor-pointer ${
        lively ? "" : `${REVEAL_TRANSITION} ${visible ? REVEAL_VISIBLE : REVEAL_HIDDEN}`
      }`}
    >
      {/* Фото — Спокойно: 14px/650ms, без масштаба. Живее: 38px/1100ms +
          отдельный слой scale(1.045→1), плюс лёгкий параллакс после реveal. */}
      <div
        ref={parallaxRef}
        style={
          lively
            ? {
                transitionDelay: `${baseDelay}ms`,
                transform: visible ? `translateY(${parallaxOffset}px)` : photoHiddenTransform,
                opacity: visible ? 1 : 0,
              }
            : {
                transitionDelay: `${baseDelay}ms`,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                opacity: visible ? 1 : 0,
              }
        }
        className={`relative overflow-hidden bg-fog aspect-[3/2] ${spread.ratio} ${spread.photoCol} order-1 ${
          lively
            ? "transition-[transform,opacity] duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            : "transition-[transform,opacity] duration-[650ms] ease-out"
        }`}
      >
        <div
          className={
            lively && visible
              ? "absolute inset-0 overflow-hidden animate-[photo-scale-in_1100ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
              : "absolute inset-0 overflow-hidden"
          }
          style={lively && !visible ? { transform: "scale(1.045)" } : undefined}
        >
          <img
            src={spread.imageOverride ?? project.cover}
            alt={project.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-[1000ms] ease-out ${
              lively
                ? "lg:group-hover:scale-[1.025] lg:group-focus-visible:scale-[1.025]"
                : "group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
            }`}
          />
        </div>
      </div>

      <div className={`${spread.textCol} order-2`}>
        <p
          style={lively ? liveChildStyle({ visible, direction, delayMs: baseDelay + LIVE_STAGGER_STEP * 1 }) : undefined}
          className={`font-serif text-5xl text-stone/40 font-light mb-4 ${lively ? LIVE_CHILD_TRANSITION : ""}`}
        >
          {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
        </p>
        <h3
          style={lively ? liveChildStyle({ visible, direction, delayMs: baseDelay + LIVE_STAGGER_STEP * 2 }) : undefined}
          className={`font-serif text-3xl md:text-4xl text-graphite font-light leading-tight mb-3 group-hover:text-accent group-focus-visible:text-accent ${
            lively
              ? "transition-[color,transform,opacity] duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              : "transition-colors duration-500"
          }`}
        >
          {project.title}
        </h3>
        <p
          style={lively ? liveChildStyle({ visible, direction, delayMs: baseDelay + LIVE_STAGGER_STEP * 2 }) : undefined}
          className={`text-stone text-xs tracking-[0.15em] uppercase mb-5 ${lively ? LIVE_CHILD_TRANSITION : ""}`}
        >
          {projectSubtitle(project)}
        </p>
        <p
          style={lively ? liveChildStyle({ visible, direction, delayMs: baseDelay + LIVE_STAGGER_STEP * 3 }) : undefined}
          className={`text-stone leading-relaxed mb-6 max-w-sm ${lively ? LIVE_CHILD_TRANSITION : ""}`}
        >
          {project.description}
        </p>
        {lively ? (
          <span
            style={liveChildStyle({ visible, direction, delayMs: baseDelay + LIVE_STAGGER_STEP * 4 })}
            className={`relative inline-flex items-center gap-2 text-graphite text-sm tracking-[0.15em] uppercase ${LIVE_CHILD_TRANSITION}`}
          >
            Смотреть проект
            <span className="lg:transition-transform lg:duration-300 lg:group-hover:translate-x-2 lg:group-focus-visible:translate-x-2">
              →
            </span>
            <span className="absolute left-0 -bottom-1 h-px w-full bg-graphite scale-x-0 origin-left transition-transform duration-[250ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </span>
        ) : (
          <span className="relative text-graphite text-sm tracking-[0.15em] uppercase">
            Смотреть проект
            <span className="absolute left-0 -bottom-1 h-px w-full bg-graphite scale-x-0 origin-left transition-transform duration-[250ms] ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </span>
        )}
      </div>
    </div>
  );
}
