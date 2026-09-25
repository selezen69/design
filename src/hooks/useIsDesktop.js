import { useEffect, useState } from "react";

/**
 * true при ширине ≥1024px (совпадает с брейкпоинтом lg проекта). Нужен,
 * чтобы чередование горизонтального направления входа (режим "Живее",
 * PortfolioB) не создавало горизонтальный скролл на мобильной полноширинной
 * колонке — там вход всегда вертикальный.
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isDesktop;
}
