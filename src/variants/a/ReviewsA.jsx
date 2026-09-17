import { REVIEWS, REVIEWS_PLACEHOLDER } from "../../data/reviews";
import {
  useReveal,
  REVEAL_TRANSITION,
  REVEAL_HIDDEN,
  REVEAL_VISIBLE,
} from "../../hooks/useReveal";

/**
 * Вариант A — светлая пауза перед контактами, тихая цитата по центру.
 */
export default function ReviewsA({ id = "reviews" } = {}) {
  const [ref, visible] = useReveal();

  return (
    <section id={id} className="bg-cream py-24 md:py-32">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto px-6 text-center ${REVEAL_TRANSITION} ${
          visible ? REVEAL_VISIBLE : REVEAL_HIDDEN
        }`}
      >
        <p className="text-accent text-xs tracking-[0.4em] uppercase mb-8">Клиенты</p>
        {REVIEWS.length > 0 ? (
          <p className="font-serif text-2xl text-graphite font-light italic leading-relaxed">
            {REVIEWS[0].text}
          </p>
        ) : (
          <p className="font-serif text-2xl text-stone font-light italic leading-relaxed">
            {REVIEWS_PLACEHOLDER}
          </p>
        )}
      </div>
    </section>
  );
}
