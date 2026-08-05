import { studio } from "../data/studio";

export default function About({ id = "about" } = {}) {
  return (
    <section id={id} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden bg-fog flex items-center justify-center">
              {studio.photo ? (
                <img
                  src={studio.photo}
                  alt={studio.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-stone text-xs tracking-widest uppercase">
                  Фото дизайнера
                </span>
              )}
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-accent opacity-30" />
          </div>

          {/* Content */}
          <div>
            <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">
              О студии
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-graphite font-light mb-8">
              {studio.name}
            </h2>
            <div className="space-y-4 text-stone leading-relaxed">
              {studio.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mt-12 pt-10 border-t border-fog">
              {studio.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-2xl md:text-3xl text-graphite font-light mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs text-stone uppercase tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
