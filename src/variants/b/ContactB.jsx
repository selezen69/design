import { useLeadForm } from "../../hooks/useLeadForm";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";
import { useMotionMode } from "../../hooks/useMotionMode";
import RevealLine from "../shared/RevealLine";

/**
 * Вариант B — контрастная тёмная финальная сцена (ритм чередования
 * светлых/тёмных сцен — из варианта C). Редакционная колонка сохраняется
 * (текст слева, вертикальная линия-разделитель, форма справа), но на
 * графите, с явным акцентным призывом к действию.
 */
export default function ContactB({ id = "contact" } = {}) {
  const { form, status, handleChange, handleSubmit } = useLeadForm();
  const [ref, visible] = useReveal();
  const { lively } = useMotionMode();

  return (
    <section id={id} className="scroll-mt-24 md:scroll-mt-28 bg-graphite pt-24 md:pt-32 pb-24">
      <div
        ref={ref}
        className={`max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <div className="lg:col-span-4">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-4">№ 06 — Напишите мне</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white font-light mb-6">
            Начать проект
          </h2>
          {lively && <RevealLine visible={visible} delayMs={150} className="w-16 mb-6 bg-accent/60" />}
          <p className="text-silver/80 leading-relaxed">
            Расскажите о вашем пространстве и пожеланиях. Я отвечу в течение
            рабочего дня и предложу удобный формат знакомства — онлайн или очно.
          </p>
        </div>

        <div className="hidden lg:block lg:col-span-1 lg:col-start-6 border-l border-white/15 h-full" />

        <div className="lg:col-span-6 lg:col-start-7">
          {status === "done" ? (
            <div className="py-10">
              <div className="font-serif text-3xl text-white font-light mb-4">Спасибо!</div>
              <p className="text-silver/80">Заявка получена. Я свяжусь с вами в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <Field label="Ваше имя *" name="name" value={form.name} onChange={handleChange} required />
              <Field
                label="Телефон или Telegram *"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <div>
                <label htmlFor="b-type" className="block text-xs tracking-widest uppercase text-silver/80 mb-2">
                  Тип объекта
                </label>
                <select
                  id="b-type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full border-b border-white/25 bg-transparent py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="" className="text-graphite">Выберите...</option>
                  <option value="apartment" className="text-graphite">Квартира</option>
                  <option value="house" className="text-graphite">Загородный дом</option>
                  <option value="other" className="text-graphite">Другое</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="b-message" className="block text-xs tracking-widest uppercase text-silver/80 mb-2">
                  Расскажите о проекте
                </label>
                <textarea
                  id="b-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Площадь, пожелания, бюджет..."
                  className="w-full border-b border-white/25 bg-transparent py-3 text-sm text-white placeholder-silver/40 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              {status === "error" && (
                <p className="md:col-span-2 text-sm text-red-400">
                  Не удалось отправить заявку. Попробуйте ещё раз чуть позже.
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className={`group relative md:col-span-2 mt-2 py-5 bg-accent text-graphite text-sm font-medium tracking-[0.15em] uppercase overflow-hidden disabled:opacity-50 ${
                  lively ? "" : "hover:bg-accent/90 transition-colors"
                }`}
              >
                {lively && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-white/40 scale-x-0 origin-left transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                )}
                <span className="relative">
                  {status === "sending" ? "Отправляем..." : "Отправить заявку"}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, required }) {
  const id = `b-${name}`;
  return (
    <div>
      <label htmlFor={id} className="block text-xs tracking-widest uppercase text-silver/80 mb-2">
        {label}
      </label>
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-b border-white/25 bg-transparent py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}
