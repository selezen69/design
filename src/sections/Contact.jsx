import { useState } from "react";
import { studio } from "../data/studio";

export default function Contact({ initialStatus = "idle", id = "contact" } = {}) {
  const [form, setForm] = useState({ name: "", phone: "", type: "", message: "" });
  const [status, setStatus] = useState(initialStatus); // idle | sending | done

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // TODO: connect to real API / Telegram bot
    setTimeout(() => setStatus("done"), 1500);
  };

  return (
    <section id={id} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <div>
            <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">
              Напишите мне
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-graphite font-light mb-8">
              Начать проект
            </h2>
            <p className="text-stone leading-relaxed mb-10">
              Расскажите о вашем пространстве и пожеланиях.
              Я отвечу в течение рабочего дня и предложу удобный
              формат знакомства — онлайн или очно.
            </p>

            <div className="space-y-4">
              <a
                href={`https://t.me/${studio.telegram}`}
                className="flex items-center gap-4 text-graphite hover:text-accent transition-colors"
              >
                <span className="text-2xl">✈</span>
                <span className="text-sm tracking-wide">Telegram @{studio.telegram}</span>
              </a>
              <a
                href={`tel:${studio.phone.replace(/\s|-/g, "")}`}
                className="flex items-center gap-4 text-graphite hover:text-accent transition-colors"
              >
                <span className="text-2xl">☎</span>
                <span className="text-sm tracking-wide">{studio.phone}</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            {status === "done" ? (
              <div className="flex flex-col items-start justify-center h-full py-16">
                <div className="font-serif text-3xl text-graphite font-light mb-4">
                  Спасибо!
                </div>
                <p className="text-stone">
                  Заявка получена. Я свяжусь с вами в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <FormField
                  label="Ваше имя *"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <FormField
                  label="Телефон или Telegram *"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
                <div>
                  <label className="block text-xs tracking-widest uppercase text-stone mb-2">
                    Тип объекта
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full border-b border-silver bg-transparent py-3 text-sm text-graphite focus:outline-none focus:border-graphite transition-colors"
                  >
                    <option value="">Выберите...</option>
                    <option value="apartment">Квартира</option>
                    <option value="house">Загородный дом</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs tracking-widest uppercase text-stone mb-2">
                    Расскажите о проекте
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Площадь, пожелания, бюджет..."
                    className="w-full border-b border-silver bg-transparent py-3 text-sm text-graphite placeholder-silver/60 focus:outline-none focus:border-graphite transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full mt-4 py-4 bg-graphite text-cream text-sm tracking-wider uppercase hover:bg-charcoal transition-colors disabled:opacity-50"
                >
                  {status === "sending" ? "Отправляем..." : "Отправить заявку"}
                </button>
                <p className="text-xs text-silver text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, name, value, onChange, required }) {
  return (
    <div>
      <label className="block text-xs tracking-widest uppercase text-stone mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b border-silver bg-transparent py-3 text-sm text-graphite placeholder-silver/60 focus:outline-none focus:border-graphite transition-colors"
      />
    </div>
  );
}
