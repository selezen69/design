/**
 * Вариант A — «Кинематографический минимализм».
 * Полноэкранный тёмный Hero, одна сильная фотография, крупная асимметричная
 * типографика, минимум элементов. Тот же реальный текст, что и в остальных
 * вариантах (motion-spec.md §3 — Ken Burns, вход текста без изменений).
 */
export default function HeroA() {
  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden bg-graphite">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60 animate-[hero-kenburns_24s_ease-in-out_infinite_alternate]"
        style={{ backgroundImage: "url('/projects/dom-so-vtorym-svetom/photo-01.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/10 to-graphite/50" />

      {/* Асимметрично смещённый текстовый блок — не по центру */}
      <div className="relative z-10 w-full px-6 md:px-20 pb-20 md:pb-28">
        <div className="max-w-3xl">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6 opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.1s_forwards]">
            Дизайн интерьеров премиум-класса
          </p>
          <h1 className="font-serif text-[clamp(2.75rem,10vw,8rem)] text-white font-light leading-[0.98] tracking-[-0.01em] opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.25s_forwards]">
            Пространство,
            <br />
            <em>которое живёт</em>
          </h1>
          <p className="mt-8 max-w-md text-silver/80 text-base leading-relaxed opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.45s_forwards]">
            Создаём интерьеры для квартир и загородных домов, в которых каждая
            деталь — осмысленный выбор.
          </p>
          <a
            href="#portfolio"
            className="group mt-10 inline-flex items-center gap-3 text-cream text-sm tracking-[0.2em] uppercase opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.6s_forwards]"
          >
            <span className="relative">
              Смотреть портфолио
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-[250ms] ease-out group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 md:right-20 z-10 flex flex-col items-center gap-2 text-silver/50">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-3 bg-silver/50 animate-[hero-breathe_1600ms_ease-in-out_infinite_alternate]" />
      </div>
    </section>
  );
}
