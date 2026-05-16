const STATS = [
  { value: "12+", label: "лет опыта" },
  { value: "80+", label: "реализованных проектов" },
  { value: "от 5 млн ₽", label: "бюджет проектов" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                alt="Дизайнер"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-accent opacity-30" />
          </div>

          {/* Content */}
          <div>
            <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">
              О дизайнере
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-graphite font-light mb-8">
              Анна Ковалёва
            </h2>
            <div className="space-y-4 text-stone leading-relaxed">
              <p>
                Создаю интерьеры, в которых каждый элемент несёт смысл.
                Работаю с квартирами бизнес-класса и загородными домами —
                пространствами, где живут и отдыхают, а не просто присутствуют.
              </p>
              <p>
                Образование: МГХПА им. Строганова, стажировка в Милане.
                Каждый проект начинается с глубокого погружения в образ жизни
                заказчика — только так рождается интерьер, который служит годами.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-10 border-t border-fog">
              {STATS.map((s) => (
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
