import { REVIEWS, REVIEWS_PLACEHOLDER } from "../../data/reviews";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант C — "книга отзывов" выставки: светлая стена, запись по центру.
 */
export default function ReviewsC({ id = "reviews" } = {}) {
  const [ref, visible] = useReveal();

  return (
    <section id={id} className="bg-beige py-24 md:py-32">
      <div
        ref={ref}
        className={`max-w-xl mx-auto px-6 text-center ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <p className="text-stone text-xs tracking-[0.4em] uppercase mb-8">Книга отзывов</p>
        <p className="font-serif text-2xl text-graphite font-light italic leading-relaxed">
          {REVIEWS.length > 0 ? REVIEWS[0].text : REVIEWS_PLACEHOLDER}
        </p>
      </div>
    </section>
  );
}
