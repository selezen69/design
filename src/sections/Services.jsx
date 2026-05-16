const SERVICES = [
  {
    num: "01",
    title: "Дизайн-проект",
    description:
      "Полный пакет документации: обмерный план, планировочные решения, 3D-визуализации, рабочие чертежи, спецификации материалов.",
    price: "от 5 000 ₽/м²",
  },
  {
    num: "02",
    title: "Авторский надзор",
    description:
      "Контроль реализации на всех этапах: приёмка материалов, взаимодействие с подрядчиками, соответствие проекту.",
    price: "от 80 000 ₽/мес",
  },
  {
    num: "03",
    title: "Комплектация",
    description:
      "Подбор и заказ мебели, светильников, декора и материалов. Работа с российскими и европейскими поставщиками.",
    price: "от 15% от бюджета",
  },
  {
    num: "04",
    title: "Консультация",
    description:
      "Разбор вашей ситуации, рекомендации по планировке, стилю и бюджету. Онлайн или очно.",
    price: "15 000 ₽/час",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-fog">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
            Что я делаю
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-graphite font-light">
            Услуги
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-silver/20">
          {SERVICES.map((s) => (
            <div key={s.num} className="bg-fog p-10 group hover:bg-white transition-colors duration-300">
              <div className="font-serif text-5xl text-silver/40 font-light mb-6">
                {s.num}
              </div>
              <h3 className="font-serif text-2xl text-graphite font-light mb-4">
                {s.title}
              </h3>
              <p className="text-stone leading-relaxed mb-6 text-sm">
                {s.description}
              </p>
              <div className="text-accent text-sm tracking-wide font-medium">
                {s.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
