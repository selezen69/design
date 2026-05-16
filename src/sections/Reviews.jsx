const REVIEWS = [
  {
    name: "Михаил и Елена Соколовы",
    project: "Загородный дом, 380 м²",
    text: "Анна создала дом, о котором мы мечтали, но не могли сформулировать. Она слышит между строк и воплощает образ жизни, а не просто заполняет пространство вещами.",
    year: "2024",
  },
  {
    name: "Андрей Волков",
    project: "Пентхаус, 210 м²",
    text: "Работали второй раз — результат превзошёл первый. Идеальное соотношение эстетики и функциональности. Гости неизменно спрашивают, кто делал интерьер.",
    year: "2023",
  },
  {
    name: "Наталья Кириллова",
    project: "Квартира, 140 м²",
    text: "Профессионализм на каждом этапе. Все сроки соблюдены, бюджет согласован заранее. Живём в проекте уже год — он стал лучше, а не потерял свежесть.",
    year: "2023",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 bg-beige">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
            Клиенты
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-graphite font-light">
            Отзывы
          </h2>
        </div>

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
      </div>
    </section>
  );
}
