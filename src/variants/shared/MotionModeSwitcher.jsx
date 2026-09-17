import { useMotionMode } from "../../hooks/useMotionMode";

/**
 * ВРЕМЕННАЯ панель сравнения интенсивности движения. Существует только в
 * этом локальном воркtree для визуального ревью — не переносить в основной
 * сайт, не коммитить как часть финального дизайна.
 */
const OPTIONS = [
  { value: "calm", label: "Спокойно" },
  { value: "lively", label: "Живее" },
];

export default function MotionModeSwitcher() {
  const { mode, setMode, reducedMotion } = useMotionMode();

  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-1.5"
      role="group"
      aria-label="Переключить интенсивность движения (временная панель сравнения)"
    >
      <div className="flex items-center gap-1 bg-graphite/95 backdrop-blur-sm text-cream px-1.5 py-1.5 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)]">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setMode(opt.value)}
            aria-pressed={mode === opt.value}
            className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors ${
              mode === opt.value
                ? "bg-accent text-white"
                : "text-cream/70 hover:text-white hover:bg-white/10"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {mode === "lively" && reducedMotion && (
        <p className="bg-graphite/90 text-cream/70 text-[11px] tracking-wide px-3 py-1">
          Система просит меньше движения — показан режим «Спокойно»
        </p>
      )}
    </div>
  );
}
