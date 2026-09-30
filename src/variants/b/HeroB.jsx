import { useEffect, useRef } from "react";
import { useMotionMode } from "../../hooks/useMotionMode";

function useArchitecturalKeyMotion(sceneRef, lively) {
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !lively || typeof window === "undefined") return undefined;

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (coarsePointer) return undefined;

    let frame = 0;

    const setSceneVariables = (x, y) => {
      scene.style.setProperty("--hero-pointer-x", `${x * 13}px`);
      scene.style.setProperty("--hero-pointer-y", `${y * 10}px`);
      scene.style.setProperty("--hero-key-tilt-x", `${y * -4}deg`);
      scene.style.setProperty("--hero-key-tilt-y", `${x * 5}deg`);
      scene.style.setProperty("--hero-bg-x", `${x * -5}px`);
      scene.style.setProperty("--hero-bg-y", `${y * -4}px`);
    };

    const onPointerMove = (event) => {
      const rect = scene.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setSceneVariables(x, y));
    };

    const onPointerLeave = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setSceneVariables(0, 0));
    };

    const onScroll = () => {
      const rect = scene.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / Math.max(rect.height * 0.72, 1))
      );
      scene.style.setProperty("--hero-key-turn", `${progress * 52}deg`);
      scene.style.setProperty("--hero-key-lift", `${progress * 22}px`);
    };

    scene.addEventListener("pointermove", onPointerMove);
    scene.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      cancelAnimationFrame(frame);
      scene.removeEventListener("pointermove", onPointerMove);
      scene.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [lively, sceneRef]);
}

/**
 * Вариант B — «Редакционный журнал» (утверждённое направление).
 * Hero разделён на текстовую и фотографическую часть, асимметричная
 * 12-колоночная сетка, номер выпуска, подпись под фото как в журнале.
 * Фото получает очень медленное, едва заметное "дыхание" по принципу
 * варианта A (motion-spec.md §3, §6 — единственное движение фона, не
 * накладывается на дополнительный parallax).
 *
 * Режим "Живее" (временный переключатель, useMotionMode) добавляет
 * заметный, но премиальный въезд при первой загрузке: светлая панель
 * "открывает" фото через transform, заголовок выезжает построчно из
 * маскирующих контейнеров. Это CSS-анимации на mount (не scroll-triggered),
 * поэтому они не переигрывают при обычной прокрутке — как и текущий
 * hero-fade-up. Композиция, текст и фото не меняются в обоих режимах.
 */
export default function HeroB() {
  const { lively } = useMotionMode();
  const sceneRef = useRef(null);
  useArchitecturalKeyMotion(sceneRef, lively);

  return (
    <section className="relative bg-cream pt-28">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 lg:min-h-[calc(100dvh-6rem)]">
        {/* Текст — колонки 1–5 */}
        <div className="lg:col-span-5 flex flex-col justify-center px-6 md:px-12 lg:pl-20 lg:pr-10 py-12 lg:py-0 order-2 lg:order-1">
          <p
            key={lively ? "eyebrow-lively" : "eyebrow-calm"}
            className={
              lively
                ? "text-stone text-xs tracking-[0.3em] uppercase mb-5 opacity-0 animate-[hero-fade-up_0.6s_ease-out_0.15s_forwards]"
                : "text-stone text-xs tracking-[0.3em] uppercase mb-5 opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.1s_forwards]"
            }
          >
            Избранные проекты
          </p>

          {lively ? (
            <h1
              key="h1-lively"
              className="font-serif text-[clamp(2.25rem,5vw,4.25rem)] text-graphite font-light leading-[1.05]"
            >
              <span className="block overflow-hidden">
                <span className="block animate-[hero-line-up_0.7s_cubic-bezier(0.16,1,0.3,1)_0.28s_both]">
                  Пространство,
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="block animate-[hero-line-up_0.7s_cubic-bezier(0.16,1,0.3,1)_0.38s_both]">
                  которое живёт
                </span>
              </span>
            </h1>
          ) : (
            <h1
              key="h1-calm"
              className="font-serif text-[clamp(2.25rem,5vw,4.25rem)] text-graphite font-light leading-[1.05] opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.25s_forwards]"
            >
              Пространство,
              <br />
              которое живёт
            </h1>
          )}

          <p
            key={lively ? "subhead-lively" : "subhead-calm"}
            className={
              lively
                ? "mt-6 max-w-sm text-stone text-base leading-relaxed opacity-0 animate-[hero-fade-up_0.6s_ease-out_0.62s_forwards]"
                : "mt-6 max-w-sm text-stone text-base leading-relaxed opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.4s_forwards]"
            }
          >
            Создаём интерьеры для квартир и загородных домов, в которых каждая
            деталь — осмысленный выбор.
          </p>

          <div
            key={lively ? "cta-lively" : "cta-calm"}
            className={
              lively
                ? "mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 opacity-0 animate-[hero-fade-up_0.6s_ease-out_0.71s_forwards]"
                : "mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.55s_forwards]"
            }
          >
            <a
              href="#portfolio"
              className={`group relative inline-flex items-center gap-2 px-8 py-4 bg-graphite text-cream text-sm tracking-[0.15em] uppercase overflow-hidden ${
                lively ? "" : "hover:bg-charcoal transition-colors"
              }`}
            >
              {lively && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-accent scale-x-0 origin-left transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
              )}
              <span className="relative">Смотреть портфолио</span>
              <span
                className={`relative transition-transform duration-300 ${
                  lively
                    ? "group-hover:translate-x-2 group-focus-visible:translate-x-2"
                    : "group-hover:translate-x-1"
                }`}
              >
                →
              </span>
            </a>
            <a href="#contact" className="group relative text-stone text-sm tracking-[0.15em] uppercase">
              Обсудить проект
              <span className="absolute left-0 -bottom-1 h-px w-full bg-stone scale-x-0 origin-left transition-transform duration-[250ms] ease-out group-hover:scale-x-100" />
            </a>
          </div>
        </div>

        {/* Сцена — колонки 6–12, full-bleed вправо. Фон и ключ разделены,
            чтобы ключ реагировал на курсор и поворачивался при прокрутке,
            а сама предметная композиция сохраняла спокойный журнальный тон. */}
        <div
          key={lively ? "photo-lively" : "photo-calm"}
          ref={sceneRef}
          className={
            lively
              ? "architect-hero-scene lg:col-span-7 relative order-1 lg:order-2 aspect-[4/3] lg:aspect-auto overflow-hidden opacity-0 animate-[hero-photo-lift-lively_1150ms_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]"
              : "architect-hero-scene lg:col-span-7 relative order-1 lg:order-2 aspect-[4/3] lg:aspect-auto overflow-hidden opacity-0 animate-[photo-lift-calm_650ms_ease-out_0.15s_forwards]"
          }
          role="img"
          aria-label="Рабочий стол дизайнера с чертежом, образцами материалов и архитектурным ключом"
        >
          <div
            className={
              lively
                ? "absolute inset-0 overflow-hidden animate-[photo-scale-in_1150ms_cubic-bezier(0.16,1,0.3,1)_0.2s_forwards]"
                : "absolute inset-0 overflow-hidden"
            }
          >
            <img
              src="/hero/designer-desk.webp"
              alt=""
              fetchPriority="high"
              className={`architect-hero-background absolute inset-0 w-full h-full object-cover ${
                lively ? "architect-hero-background--moving" : ""
              }`}
            />
          </div>

          <div aria-hidden="true" className="architect-hero-glow" />
          <div aria-hidden="true" className="architect-hero-key-stage">
            <img
              src="/hero/architectural-key.webp"
              alt=""
              className={`architect-hero-key ${
                lively ? "architect-hero-key--moving" : ""
              }`}
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pt-10 pb-6 lg:px-10 lg:pb-10 bg-gradient-to-t from-graphite/55 via-graphite/15 to-transparent pointer-events-none">
            <p className="text-cream/90 text-xs tracking-[0.2em] uppercase">
              Эскиз · материал · пространство
            </p>
            <p className="mt-2 hidden lg:block text-cream/70 text-[11px] tracking-[0.12em] uppercase">
              Ключ к интерьеру начинается с точного плана
            </p>
          </div>
          {lively && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cream animate-[hero-panel-slide_1150ms_cubic-bezier(0.65,0,0.35,1)_0.2s_forwards]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
