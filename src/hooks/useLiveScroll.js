import { useEffect, useState } from "react";

/**
 * Один общий обработчик scroll на всю страницу — используется и
 * параллаксом портфолио, и индикатором прогресса режима "Живее", чтобы не
 * плодить несколько обработчиков прокрутки. Throttled через
 * requestAnimationFrame (motion-spec.md §6 — тот же приём, что уже
 * прописан для параллакса обложки ProjectDetail).
 */
let subscribers = new Set();
let listenerAttached = false;
let ticking = false;

function handleScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    subscribers.forEach((cb) => cb(y));
    ticking = false;
  });
}

function attachListener() {
  if (listenerAttached || typeof window === "undefined") return;
  window.addEventListener("scroll", handleScroll, { passive: true });
  listenerAttached = true;
}

/** Подписка на общий rAF-throttled scrollY. Включается только когда нужно. */
export function useLiveScrollY(enabled) {
  const [y, setY] = useState(() =>
    enabled && typeof window !== "undefined" ? window.scrollY : 0
  );

  useEffect(() => {
    if (!enabled) return undefined;
    attachListener();
    subscribers.add(setY);
    return () => {
      subscribers.delete(setY);
    };
  }, [enabled]);

  return y;
}
