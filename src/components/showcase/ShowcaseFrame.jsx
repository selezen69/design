import { useEffect, useRef, useState } from "react";

/**
 * Масштабирует реальный компонент до размера превью-карточки.
 * Внутренний враппер получает CSS transform, который заодно
 * становится containing block для потомков с position:fixed
 * (напр. ProjectDetail), поэтому модалки корректно обрезаются рамкой.
 */
export default function ShowcaseFrame({
  children,
  title,
  note,
  designWidth = 1440,
  height = 320,
  contentHeight,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      if (el.offsetWidth > 0) setScale(el.offsetWidth / designWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  // Некоторые браузеры сдвигают scrollLeft/Top рамки при появлении
  // крупного fixed-потомка (напр. открытие ProjectDetail) даже с
  // overflow-anchor: none — принудительно возвращаем рамку на (0, 0).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const resetScroll = () => {
      if (el.scrollLeft !== 0) el.scrollLeft = 0;
      if (el.scrollTop !== 0) el.scrollTop = 0;
    };
    el.addEventListener("scroll", resetScroll, { passive: true });
    return () => el.removeEventListener("scroll", resetScroll);
  }, []);

  return (
    <figure className="flex flex-col">
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-white border border-fog"
        style={{ height, overflowAnchor: "none" }}
      >
        <div
          style={{
            width: designWidth,
            minHeight: contentHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
      <figcaption className="mt-3">
        <div className="text-sm text-graphite font-medium leading-snug">{title}</div>
        {note && <div className="text-xs text-stone mt-1 leading-relaxed">{note}</div>}
      </figcaption>
    </figure>
  );
}
