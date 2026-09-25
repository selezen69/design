import { REVIEWS, REVIEWS_PLACEHOLDER } from "../../data/reviews";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант B — большая редакционная цитата (pull-quote) с крупным
 * декоративным символом кавычки.
 */
export default function ReviewsB({ id = "reviews" } = {}) {
  const [ref, visible] = useReveal();

  return (
    <section id={id} className="bg-beige py-24 md:py-32">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-6 md:px-12 ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <p className="text-stone text-xs tracking-[0.3em] uppercase mb-3">Клиенты</p>
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 items-start mt-8">
          <span className="font-serif text-8xl text-accent/40 font-light leading-none">"</span>
          <p className="font-serif text-2xl md:text-3xl text-graphite font-light leading-snug">
            {REVIEWS.length > 0 ? REVIEWS[0].text : REVIEWS_PLACEHOLDER}
          </p>
        </div>
      </div>
    </section>
  );
}
