import { createContext } from "react";

/**
 * ВРЕМЕННЫЙ переключатель интенсивности движения ("Спокойно" / "Живее") —
 * не часть утверждённого дизайна. См. MotionModeProvider.jsx и
 * useMotionMode.js (разнесены по файлам под react-refresh/only-export-components).
 */
export const MotionModeContext = createContext({
  mode: "calm",
  setMode: () => {},
  lively: false,
  reducedMotion: false,
});
