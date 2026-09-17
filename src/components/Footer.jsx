import { studio } from "../data/studio";

export default function Footer() {
  return (
    <footer className="bg-graphite py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-lg tracking-widest uppercase text-silver/75">
          {studio.logoText}
        </span>
        <p className="text-silver/70 text-xs tracking-wide">
          © {new Date().getFullYear()} {studio.name}. Дизайн интерьеров.
        </p>
      </div>
    </footer>
  );
}
