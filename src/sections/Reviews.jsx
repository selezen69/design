// TODO: добавить реальные отзывы клиентов сюда по мере поступления.
const REVIEWS = [];

export default function Reviews({ id = "reviews" } = {}) {
  return (
    <section id={id} className="py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
            Клиенты
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-graphite font-light">
            Отзывы
          </h2>
        </div>

        {REVIEWS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-cream p-8 flex flex-col">
                {/* Quote mark */}
                <div className="font-serif text-5xl text-accent/30 font-light leading-none mb-6">
                  "
                </div>
                <p className="text-stone leading-relaxed flex-1 text-sm mb-8">
                  {r.text}
                </p>
                <div className="pt-6 border-t border-fog">
                  <div className="font-medium text-graphite text-sm">{r.name}</div>
                  <div className="text-stone text-xs mt-1">{r.project}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-cream p-10 text-center">
            <p className="text-stone leading-relaxed">
              Отзывы клиентов появятся здесь после реализации первых проектов.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
