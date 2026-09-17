import { useMemo, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { MotionModeContext } from "./motionModeContext";

/**
 * "Спокойно" = точное текущее поведение (ничего здесь не подключается).
 * "Живее" == mode "lively" И НЕ prefers-reduced-motion — системная настройка
 * имеет приоритет над переключателем в любом случае.
 *
 * Клиентский preview по умолчанию открывается в режиме "Живее" — это
 * временный переключатель для нашего внутреннего сравнения (см.
 * MotionModeSwitcher.jsx), а не часть утверждённого дизайна.
 */
export function MotionModeProvider({ children }) {
  const [mode, setMode] = useState("lively");
  const reducedMotion = usePrefersReducedMotion();

  const value = useMemo(
    () => ({
      mode,
      setMode,
      lively: mode === "lively" && !reducedMotion,
      reducedMotion,
    }),
    [mode, reducedMotion]
  );

  return (
    <MotionModeContext.Provider value={value}>
      {children}
    </MotionModeContext.Provider>
  );
}
