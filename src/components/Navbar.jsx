import { useState, useEffect, useRef, Fragment } from "react";
import { studio } from "../data/studio";
import { useScrollLock } from "../hooks/useScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";

// Всегда видимые ссылки на desktop (product.md / design-system.md §9)
const PRIMARY_LINKS = [
  { href: "#portfolio", label: "Портфолио" },
  { href: "#services", label: "Услуги" },
  { href: "#contact", label: "Контакт" },
];

// Полноэкранное меню (открывается и "Меню" на desktop, и бургером на
// мобильном — единый оверлей вместо раздельных панели/дровера).
const MENU_LINKS = [
  { href: "#about", label: "О студии" },
  { href: "#portfolio", label: "Портфолио" },
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Этапы" },
  { href: "#values", label: "Ценности" },
  { href: "#contact", label: "Контакты" },
];

// Ссылки в меню закрывают оверлей через setState — React убирает <a> из DOM
// в тот же тик, до того как браузер успевает выполнить нативный
// scroll-to-fragment для клика по этому элементу, поэтому переход срывается.
// Прокручиваем и обновляем hash вручную, уже после того как оверлей закрылся.
function scrollToAnchor(href) {
  const id = href.slice(1);
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
  }, 0);
  if (window.location.hash !== href) {
    window.history.pushState(null, "", href);
  }
}

export default function Navbar({ initialScrolled = false, heroTheme = "light" } = {}) {
  const [scrolled, setScrolled] = useState(initialScrolled);
  // Один оверлей на все ширины экрана — открывается и бургером на мобильном,
  // и кнопкой "Меню" на desktop (раньше это были два разных элемента:
  // боковая панель на desktop и отдельный дровер на мобильном — боковая
  // панель "сливалась" с содержимым страницы из-за containing block от
  // backdrop-blur на хедере; полноэкранный fixed-оверлей с непрозрачным
  // фоном от этого не зависит).
  const [menuOpen, setMenuOpen] = useState(false);
  // Пока меню открыто, страница заблокирована (useScrollLock) — 'scroll'
  // больше не срабатывает, и `scrolled` остаётся "замороженным" на значении
  // момента открытия. Поэтому хедер всегда непрозрачный, пока меню открыто,
  // независимо от реальной прокрутки.
  const headerOpaque = scrolled || menuOpen;
  // heroTheme="dark" — раздел Hero тёмный/полноэкранный, до скролля нужен
  // светлый текст поверх фото; после скролла (или пока открыт оверлей)
  // навбар всегда становится светлым с тёмным текстом.
  const overDarkHero = heroTheme === "dark" && !headerOpaque;
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Пока меню открыто — основная страница не прокручивается (её положение
  // восстанавливается точно при закрытии), а сам оверлей зафиксирован
  // относительно viewport и не зависит от scroll/parallax/reveal остального
  // сайта.
  useScrollLock(menuOpen);
  useFocusTrap(menuOpen, menuRef, () => setMenuOpen(false));

  return (
    <Fragment>
      {/* backdrop-blur на хедере создаёт новый containing block для своих
          position:fixed потомков (CSS: backdrop-filter/filter ведут себя
          как transform в этом отношении) — вложенные туда fixed-оверлеи
          получили бы top/bottom относительно ~80px хедера, а не viewport, и
          схлопывались бы по высоте. Поэтому меню и панель — не потомки
          <header>, а его соседи; сам header ничего не зависит от их DOM-
          положения. */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          headerOpaque ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className={`font-serif text-xl tracking-widest uppercase transition-colors ${
              overDarkHero ? "text-cream" : "text-graphite"
            }`}
          >
            {studio.logoText}
          </a>

          {/* Desktop nav — 3 постоянные ссылки + "Меню" открывает тот же
              полноэкранный оверлей, что и бургер на мобильном */}
          <nav className="hidden md:flex items-center gap-8">
            {PRIMARY_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wider transition-colors uppercase ${
                  overDarkHero ? "text-cream/80 hover:text-cream" : "text-stone hover:text-graphite"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              className={`text-sm tracking-wider transition-colors uppercase ${
                overDarkHero ? "text-cream/80 hover:text-cream" : "text-stone hover:text-graphite"
              }`}
            >
              Меню
            </button>
          </nav>

          {/* Burger (mobile) — открывает тот же оверлей, что и "Меню" на desktop */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
          >
            <span className={`block w-6 h-px transition-all ${overDarkHero ? "bg-cream" : "bg-graphite"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px transition-all ${overDarkHero ? "bg-cream" : "bg-graphite"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px transition-all ${overDarkHero ? "bg-cream" : "bg-graphite"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Полноэкранное меню — единый fixed-оверлей на весь viewport, на
          всех ширинах экрана (не потомок <header>, чтобы не зависеть от
          его containing block: backdrop-blur/filter на предке ведут себя
          как transform и "ломают" position:fixed у потомков). Непрозрачный
          фон на весь inset-0, z-index выше хедера (z-50), ScrollProgress
          (z-40), ProjectDetail (z-[60]) и временного MotionModeSwitcher
          (z-[100]). */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="nav-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className="fixed inset-0 z-[150] bg-graphite flex flex-col overflow-y-auto overscroll-contain"
        >
          <div className="flex justify-end px-6 pt-6 md:px-10 md:pt-8">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
              className="text-cream/70 hover:text-cream text-sm tracking-widest uppercase transition-colors p-2"
            >
              Закрыть ×
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center gap-6 md:gap-8 px-8 md:px-16 py-10">
            {MENU_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  scrollToAnchor(link.href);
                }}
                className="font-serif text-4xl md:text-6xl leading-tight text-cream/90 hover:text-accent font-light transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-silver/60 text-xs tracking-widest uppercase shrink-0 px-8 md:px-16 pb-8">
            {studio.logoText}
          </p>
        </div>
      )}
    </Fragment>
  );
}
