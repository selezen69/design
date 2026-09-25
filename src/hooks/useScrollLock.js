import { useEffect, useRef } from "react";

/**
 * Полностью блокирует прокрутку основной страницы, пока active === true, и
 * восстанавливает точную позицию скролла после закрытия. Использует приём
 * "position: fixed на body" (а не только overflow:hidden) — это надёжнее
 * на мобильных браузерах, где overflow:hidden само по себе не всегда
 * предотвращает прокрутку/"прыжок" адресной строки под контентом.
 */
export function useScrollLock(active) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!active) return undefined;

    const scrollY = window.scrollY;
    scrollYRef.current = scrollY;

    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [active]);
}
