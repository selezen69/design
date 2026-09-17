import { useLiveScrollY } from "../../hooks/useLiveScroll";

/**
 * Тонкий золотистый индикатор прогресса у правого края — только desktop,
 * только режим "Живее". Не перехватывает прокрутку и не перекрывает
 * контент (pointer-events: none, узкая полоса у самого края). Использует
 * общий scroll-хук, отдельного обработчика не заводит.
 */
export default function ScrollProgress({ enabled }) {
  const scrollY = useLiveScrollY(enabled);

  if (!enabled) return null;

  const max =
    typeof document !== "undefined"
      ? document.documentElement.scrollHeight - window.innerHeight
      : 0;
  const progress = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;

  return (
    <div
      aria-hidden="true"
      className="hidden lg:block fixed top-0 right-3 z-40 w-px h-screen pointer-events-none bg-graphite/[0.06]"
    >
      <div
        className="w-px bg-accent/80"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  );
}
