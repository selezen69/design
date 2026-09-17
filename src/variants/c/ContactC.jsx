import { studio } from "../../data/studio";
import { useLeadForm } from "../../hooks/useLeadForm";

/**
 * Вариант C — выход из экспозиции на свет: светлая закрывающая сцена,
 * асимметричная (текст слева, форма справа, без центрирования).
 */
export default function ContactC({ id = "contact" } = {}) {
  const { form, status, handleChange, handleSubmit } = useLeadForm();

  return (
    <section id={id} className="bg-cream py-24 md:py-36">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="text-stone text-xs tracking-[0.4em] uppercase mb-4">Напишите мне</p>
          <h2 className="font-serif text-4xl md:text-6xl text-graphite font-light mb-6">
            Начать проект
          </h2>
          <p className="text-stone leading-relaxed mb-10 max-w-sm">
            Расскажите о вашем пространстве и пожеланиях. Я отвечу в течение
            рабочего дня и предложу удобный формат знакомства — онлайн или очно.
          </p>
          <div className="space-y-4">
            <a
              href={`https://t.me/${studio.telegram}`}
              className="flex items-center gap-4 text-graphite hover:text-accent transition-colors"
            >
              <span className="text-xl">✈</span>
              <span className="text-sm tracking-wide">Telegram @{studio.telegram}</span>
            </a>
            <a
              href={`tel:${studio.phone.replace(/\s|-/g, "")}`}
              className="flex items-center gap-4 text-graphite hover:text-accent transition-colors"
            >
              <span className="text-xl">☎</span>
              <span className="text-sm tracking-wide">{studio.phone}</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {status === "done" ? (
            <div className="flex flex-col items-start justify-center h-full py-16">
              <div className="font-serif text-3xl text-graphite font-light mb-4">Спасибо!</div>
              <p className="text-stone">Заявка получена. Я свяжусь с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field label="Ваше имя *" name="name" value={form.name} onChange={handleChange} required />
              <Field
                label="Телефон или Telegram *"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <div>
                <label htmlFor="c-type" className="block text-xs tracking-widest uppercase text-stone mb-2">
                  Тип объекта
                </label>
                <select
                  id="c-type"
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
                <label htmlFor="c-message" className="block text-xs tracking-widest uppercase text-stone mb-2">
                  Расскажите о проекте
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Площадь, пожелания, бюджет..."
                  className="w-full border-b border-silver bg-transparent py-3 text-sm text-graphite placeholder-silver/60 focus:outline-none focus:border-graphite transition-colors resize-none"
                />
              </div>
              {status === "error" && (
                <p className="text-sm text-red-600">
                  Не удалось отправить заявку. Попробуйте ещё раз или напишите в{" "}
                  <a href={`https://t.me/${studio.telegram}`} className="underline hover:text-graphite">
                    Telegram
                  </a>
                  .
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full mt-4 py-4 bg-graphite text-cream text-sm tracking-wider uppercase hover:bg-charcoal transition-colors disabled:opacity-50"
              >
                {status === "sending" ? "Отправляем..." : "Отправить заявку"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, required }) {
  const id = `c-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs tracking-widest uppercase text-stone mb-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b border-silver bg-transparent py-3 text-sm text-graphite focus:outline-none focus:border-graphite transition-colors"
      />
    </div>
  );
}
