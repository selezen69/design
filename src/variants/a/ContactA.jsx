import { studio } from "../../data/studio";
import { useLeadForm } from "../../hooks/useLeadForm";

/**
 * Вариант A — тёмная закрывающая сцена, центрированная, тонкие поля
 * без рамок, минимум визуального шума.
 */
export default function ContactA({ id = "contact" } = {}) {
  const { form, status, handleChange, handleSubmit } = useLeadForm();

  return (
    <section id={id} className="bg-graphite py-24 md:py-36">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-4">Напишите мне</p>
        <h2 className="font-serif text-4xl md:text-6xl text-white font-light mb-6">
          Начать проект
        </h2>
        <p className="text-silver/70 leading-relaxed mb-12 max-w-md mx-auto">
          Расскажите о вашем пространстве и пожеланиях. Я отвечу в течение
          рабочего дня и предложу удобный формат знакомства — онлайн или очно.
        </p>

        {status === "done" ? (
          <div className="py-10">
            <div className="font-serif text-2xl text-white font-light mb-3">Спасибо!</div>
            <p className="text-silver/70">Заявка получена. Я свяжусь с вами в ближайшее время.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <Field label="Ваше имя *" name="name" value={form.name} onChange={handleChange} required />
            <Field
              label="Телефон или Telegram *"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <div>
              <label htmlFor="a-type" className="block text-xs tracking-widest uppercase text-silver/60 mb-2">
                Тип объекта
              </label>
              <select
                id="a-type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Выберите...</option>
                <option value="apartment">Квартира</option>
                <option value="house">Загородный дом</option>
                <option value="other">Другое</option>
              </select>
            </div>
            {status === "error" && (
              <p className="text-sm text-red-400">
                Не удалось отправить заявку. Попробуйте ещё раз или напишите в{" "}
                <a href={`https://t.me/${studio.telegram}`} className="underline hover:text-white">
                  Telegram
                </a>
                .
              </p>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full mt-2 py-4 border border-white/30 text-white text-sm tracking-[0.2em] uppercase hover:bg-white/5 hover:border-accent transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Отправляем..." : "Отправить заявку"}
            </button>
          </form>
        )}

        <div className="mt-12 flex items-center justify-center gap-8 text-silver/60 text-sm">
          <a href={`https://t.me/${studio.telegram}`} className="hover:text-accent transition-colors">
            Telegram
          </a>
          <a href={`tel:${studio.phone.replace(/\s|-/g, "")}`} className="hover:text-accent transition-colors">
            {studio.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, required }) {
  const id = `a-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs tracking-widest uppercase text-silver/60 mb-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b border-white/20 bg-transparent py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
