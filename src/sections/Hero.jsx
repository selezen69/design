export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-graphite">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90')",
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-transparent to-graphite/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6">
          Дизайн интерьеров премиум-класса
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light leading-tight mb-8">
          Пространство,
          <br />
          <em>которое живёт</em>
        </h1>
        <p className="text-silver text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
          Создаём интерьеры для квартир и загородных домов,
          в которых каждая деталь — осмысленный выбор.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#portfolio"
            className="px-8 py-4 bg-accent text-white text-sm tracking-wider uppercase hover:bg-accent/90 transition-colors"
          >
            Смотреть портфолио
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-silver text-silver text-sm tracking-wider uppercase hover:bg-white/10 transition-colors"
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
