import { studio } from "../../data/studio";

/**
 * Вариант C — «Авторская галерея».
 * Hero строится вокруг личности дизайнера: асимметричный тёмный холст,
 * фотография — крупное вертикальное окно (то же реальное фото, что и в
 * разделе "О студии" во всех вариантах), манифест-типографика рядом.
 */
export default function HeroC() {
  return (
    <section className="relative min-h-[100dvh] bg-graphite overflow-hidden">
      <div className="relative z-10 max-w-[1600px] mx-auto h-full min-h-[100dvh] grid grid-cols-1 lg:grid-cols-12">
        {/* Манифест — смещён к левому краю, начинается ниже навбара */}
        <div className="lg:col-span-6 flex flex-col justify-center px-6 md:px-16 pt-32 pb-16 lg:py-0 order-2 lg:order-1">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-6 opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.1s_forwards]">
            Авторский подход · {studio.name}
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,7vw,6rem)] text-white font-light leading-[1.02] opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.25s_forwards]">
            Пространство,
            <br />
            <em>которое живёт</em>
          </h1>
          <p className="mt-8 max-w-sm text-silver/70 text-base leading-relaxed opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.45s_forwards]">
            {studio.bio[0]}
          </p>
          <a
            href="#portfolio"
            className="group mt-10 inline-flex items-center gap-3 text-cream text-sm tracking-[0.2em] uppercase w-fit opacity-0 animate-[hero-fade-up_0.9s_ease-out_0.6s_forwards]"
          >
            <span className="relative">
              Смотреть экспозицию
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-accent transition-all duration-[250ms] ease-out group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Вертикальное "окно" — портрет дизайнера, асимметрично прижато к правому краю */}
        <div className="lg:col-span-6 relative order-1 lg:order-2 h-[55vh] lg:h-auto">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[75%] overflow-hidden">
            <img
              src={studio.photo}
              alt={studio.name}
              fetchPriority="high"
              className="w-full h-full object-cover animate-[hero-kenburns_24s_ease-in-out_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-graphite/40 via-transparent to-graphite/70 lg:bg-gradient-to-r lg:from-graphite/50 lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 md:left-16 z-10 flex items-center gap-3 text-silver/50">
        <div className="w-px h-3 bg-silver/50 animate-[hero-breathe_1600ms_ease-in-out_infinite_alternate]" />
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  );
}
