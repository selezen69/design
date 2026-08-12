export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-graphite">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-45 animate-[hero-kenburns_24s_ease-in-out_infinite_alternate]"
        style={{
          backgroundImage:
            "url('/projects/dom-so-vtorym-svetom/photo-01.jpg')",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/70 via-graphite/25 to-graphite/90" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 35%, rgba(26,26,26,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div
          className="w-px h-10 bg-accent/70 mx-auto mb-6 opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.1s_forwards]"
        />
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6 opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.2s_forwards]">
          Дизайн интерьеров премиум-класса
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light leading-tight mb-8 opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.35s_forwards]">
          Пространство,
          <br />
          <em>которое живёт</em>
        </h1>
        <p className="text-silver text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.5s_forwards]">
          Создаём интерьеры для квартир и загородных домов,
          в которых каждая деталь — осмысленный выбор.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.65s_forwards]">
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-accent text-white text-sm tracking-wider uppercase hover:bg-accent/90 transition-colors"
          >
            Смотреть портфолио
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-silver/70 text-silver text-sm tracking-wider uppercase hover:border-accent hover:text-white hover:bg-white/5 transition-colors"
          >
            Обсудить проект
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-silver/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-silver/30 animate-pulse" />
      </div>
    </section>
  );
}
