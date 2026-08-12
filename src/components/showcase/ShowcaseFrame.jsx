import { useEffect, useRef } from "react";

/**
 * Обёртка для живого превью реального компонента — без визуального
 * уменьшения (никакого transform-scale), поэтому текст, кнопки и поля
 * формы имеют настоящий размер и кликабельны как на реальном сайте.
 *
 * contained=true ограничивает высоту и добавляет прокрутку — используется
 * только там, где внутри есть position:fixed потомки (Navbar, ProjectDetail),
 * потому что identity-transform (scale(1)) заодно становится containing
 * block для них: fixed-элемент заполняет именно эту рамку, а не весь экран.
 * Без contained компонент рендерится в обычном потоке страницы, во весь
 * свой настоящий рост — так честнее и не провоцирует лишние баги скролла.
 */
export default function ShowcaseFrame({
  children,
  title,
  hint,
  note,
  contained = false,
  maxHeight = 640,
}) {
  const containerRef = useRef(null);

  // Некоторые браузеры сдвигают scrollLeft/Top рамки при появлении
  // крупного fixed-потомка (напр. открытие ProjectDetail) даже с
  // overflow-anchor: none — принудительно возвращаем рамку на (0, 0).
  useEffect(() => {
    if (!contained) return;
    const el = containerRef.current;
    if (!el) return;
    const resetScroll = () => {
      if (el.scrollLeft !== 0) el.scrollLeft = 0;
    };
    el.addEventListener("scroll", resetScroll, { passive: true });
    return () => el.removeEventListener("scroll", resetScroll);
  }, [contained]);

  return (
    <div className="border border-fog bg-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-3 border-b border-fog bg-fog/50">
        <span className="text-sm text-graphite font-medium">{title}</span>
        {note && <span className="text-xs text-stone">{note}</span>}
      </div>

      {hint && (
        <div className="px-5 py-2.5 border-b border-fog bg-accent/10 text-xs text-graphite leading-relaxed">
          👉 {hint}
        </div>
      )}

      {contained ? (
        <div
          ref={containerRef}
          className="relative overflow-y-auto overflow-x-hidden"
          style={{ maxHeight, transform: "scale(1)", overflowAnchor: "none" }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
