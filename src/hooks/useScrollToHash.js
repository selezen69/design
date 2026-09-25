import { useEffect } from "react";

/**
 * Прямое открытие URL с #hash в SPA без серверного рендеринга: браузер
 * пытается выполнить нативный scroll-to-fragment ещё до того, как React
 * успевает отрендерить целевой элемент, поэтому на первой загрузке он
 * часто не срабатывает (в отличие от кликов по уже смонтированной
 * навигации). Досоздаём переход вручную после монтирования — тот же
 * scrollIntoView, что и у обычных якорных ссылок, поэтому используется
 * тот же scroll-margin-top у секций (учитывает высоту фиксированного
 * Navbar). Переход на самой первой загрузке — мгновенный (behavior:
 * "instant"), как и нативная браузерная прокрутка к фрагменту: это не
 * анимация экрана, а восстановление позиции при открытии ссылки, поэтому
 * prefers-reduced-motion здесь ни при чём (обычные клики по навигации
 * после монтирования по-прежнему плавные — за них отвечает глобальный
 * scroll-behavior: smooth в index.css, который уже корректно деградирует
 * под prefers-reduced-motion).
 */
export function useScrollToHash() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;

    const id = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
    };

    // Ждём полной загрузки (включая изображения) перед прокруткой — иначе
    // возможна гонка с их декодированием на самой первой загрузке страницы.
    // setTimeout, а не requestAnimationFrame — переход не должен зависеть
    // от того, идёт ли в данный момент цикл рендеринга/отрисовки вкладки.
    if (document.readyState === "complete") {
      setTimeout(scrollToTarget, 0);
    } else {
      const onLoad = () => setTimeout(scrollToTarget, 0);
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);
}
