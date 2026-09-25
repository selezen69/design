import { useContext } from "react";
import { MotionModeContext } from "./motionModeContext";

export function useMotionMode() {
  return useContext(MotionModeContext);
}
