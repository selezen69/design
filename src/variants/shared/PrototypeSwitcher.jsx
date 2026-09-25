/**
 * ВРЕМЕННАЯ панель сравнения прототипов. Существует только в этом локальном
 * воркtree для визуального ревью — не переносить в основной сайт/App.jsx
 * главной ветки, не коммитить как часть финального дизайна.
 */
const OPTIONS = [
  { value: "a", label: "Вариант A" },
  { value: "b", label: "Вариант B" },
  { value: "c", label: "Вариант C" },
];

export default function PrototypeSwitcher({ active, onChange }) {
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 bg-graphite/95 backdrop-blur-sm text-cream px-1.5 py-1.5 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)]"
      role="group"
      aria-label="Переключить вариант прототипа (временная панель сравнения)"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          aria-pressed={active === opt.value}
          className={`px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors ${
            active === opt.value
              ? "bg-accent text-white"
              : "text-cream/70 hover:text-white hover:bg-white/10"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
