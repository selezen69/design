import { useEffect, useRef, useState } from "react";
import { useLiveScrollY } from "./useLiveScroll";

/**
 * Очень лёгкий вертикальный параллакс (motion-spec.md §6 — тот же приём,
 * что и параллакс обложки ProjectDetail: смещение ограничено, считается
 * от положения элемента относительно центра вьюпорта). Задействует общий
 * scroll-хук — отдельного обработчика не создаёт.
 */
export function useParallax(enabled, maxOffset = 20) {
  const ref = useRef(null);
  const scrollY = useLiveScrollY(enabled);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elCenter = rect.top + rect.height / 2;
    const distance = elCenter - viewportCenter;
    const ratio = Math.max(-1, Math.min(1, distance / window.innerHeight));
    setOffset(-ratio * maxOffset);
  }, [scrollY, enabled, maxOffset]);

  return [ref, enabled ? offset : 0];
}
