import { useEffect, useRef, useState } from "react";
import { useMotionMode } from "./useMotionMode";

/**
 * Единый reveal-on-scroll хук (motion-spec.md §2, §9).
 * Срабатывает один раз при первом пересечении, дальше не переигрывает при
 * обычной прокрутке вверх/вниз. Деградация под prefers-reduced-motion
 * обеспечивается глобально в index.css (transition-duration сжимается до
 * 0.01ms) — здесь ничего дополнительно определять не нужно.
 *
 * Исключение — переключение временного режима "Спокойно"/"Живее"
 * (useMotionMode): если элемент СЕЙЧАС находится в видимой области, при
 * смене режима его reveal-анимация запускается заново (кратко скрыть →
 * показать), чтобы разницу между режимами можно было увидеть без ручной
 * перезагрузки страницы. Наблюдение за пересечением не останавливается
 * (нужно постоянно знать, виден ли элемент сейчас), но повторный показ
 * никогда не проигрывается сам по себе — только по явной смене режима.
 */
export function useReveal({ threshold = 0.2, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const noObserverSupport = typeof IntersectionObserver === "undefined";
  const [visible, setVisible] = useState(noObserverSupport);
  const isIntersectingRef = useRef(false);
  const { lively } = useMotionMode();
  const prevLivelyRef = useRef(lively);
  const replayTimeoutRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || noObserverSupport) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, noObserverSupport]);

  useEffect(() => {
    if (prevLivelyRef.current === lively) return undefined;
    prevLivelyRef.current = lively;
    if (!isIntersectingRef.current) return undefined;

    setVisible(false);
    // Пауза должна быть достаточной, чтобы браузер успел закоммитить и
    // отрисовать скрытое состояние — иначе CSS-transition просто
    // "развернётся" из середины перехода вместо полноценного повтора
    // (React batches setVisible(false)+setVisible(true) в один тик без
    // паузы, и при слишком короткой паузе переход не успевает начаться).
    // Принудительный reflow (getBoundingClientRect) перед возвратом
    // visible=true гарантирует, что скрытое состояние зафиксировано.
    replayTimeoutRef.current = setTimeout(() => {
      ref.current?.getBoundingClientRect();
      setVisible(true);
    }, 70);
    return () => clearTimeout(replayTimeoutRef.current);
  }, [lively]);

  return [ref, visible];
}

/** Общие классы перехода для reveal-элементов (motion-spec.md §2). */
export const REVEAL_TRANSITION =
  "transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
export const REVEAL_HIDDEN = "opacity-0 translate-y-6";
export const REVEAL_VISIBLE = "opacity-100 translate-y-0";
