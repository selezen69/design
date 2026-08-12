export default function CategorySection({ id, title, description, children }) {
  return (
    <section id={id} className="py-14 md:py-20 border-b border-fog scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl text-graphite font-light mb-3">
            {title}
          </h2>
          {description && (
            <p className="text-stone text-sm leading-relaxed">{description}</p>
          )}
        </div>
        <div className="flex flex-col gap-14">{children}</div>
      </div>
    </section>
  );
}
