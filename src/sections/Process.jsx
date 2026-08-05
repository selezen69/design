const STEPS = [
  {
    num: "01",
    title: "Знакомство",
    duration: "1–2 дня",
    description:
      "Первая встреча или видеозвонок. Обсуждаем ваш образ жизни, пожелания и бюджет. Без обязательств.",
  },
  {
    num: "02",
    title: "Концепция",
    duration: "2–3 недели",
    description:
      "Разрабатываем несколько концептуальных направлений с референсами, палитрой и планировочными решениями.",
  },
  {
    num: "03",
    title: "Рабочий проект",
    duration: "4–6 недель",
    description:
      "Создаём полный комплект чертежей, 3D-визуализаций и спецификаций для строителей и поставщиков.",
  },
  {
    num: "04",
    title: "Реализация",
    duration: "3–12 месяцев",
    description:
      "Авторский надзор на стройке, комплектация объекта, финальная расстановка и стилизация.",
  },
];

export default function Process({ id = "process" } = {}) {
  return (
    <section id={id} className="py-24 bg-graphite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-3">
            Как мы работаем
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light">
            Этапы
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-silver/10 z-0" />
              )}

              <div className="font-serif text-6xl text-white/10 font-light mb-4">
                {step.num}
              </div>
              <h3 className="font-serif text-xl text-white font-light mb-2">
                {step.title}
              </h3>
              <p className="text-accent text-xs tracking-widest uppercase mb-4">
                {step.duration}
              </p>
              <p className="text-silver/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
