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

// Убраны в раскрывающуюся панель на desktop
const SECONDARY_LINKS = [
  { href: "#about", label: "О дизайнере" },
  { href: "#process", label: "Процесс" },
  { href: "#values", label: "Что ценят наши клиенты" },
];

// Полный список (исходный порядок разделов) — используется в компактном
// мобильном меню, где не нужно постоянно держать 3 ссылки отдельно (design-system.md §9)
const ALL_LINKS = [
  { href: "#portfolio", label: "Портфолио" },
  { href: "#about", label: "О дизайнере" },
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Процесс" },
  { href: "#values", label: "Что ценят наши клиенты" },
  { href: "#contact", label: "Контакт" },
];

// Ссылки в мобильном меню и в десктопной панели "Меню" одновременно
// закрывают оверлей через setState — React убирает <a> из DOM в тот же
// тик, до того как браузер успевает выполнить нативный scroll-to-fragment
// для клика по этому элементу, поэтому переход срывается. Прокручиваем и
// обновляем hash вручную, уже после того как оверлей закрылся.
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  // Пока меню/панель открыты, страница заблокирована (useScrollLock) — 'scroll'
  // больше не срабатывает, и `scrolled` остаётся "замороженным" на значении
  // момента открытия. Если в этот момент оно было false, хедер рисовался
  // прозрачным, а мобильное меню начинается только с top-16 — сквозь
  // прозрачную полосу хедера было видно содержимое страницы позади (баг
  // "элементы меню накладываются"). Поэтому хедер всегда непрозрачный,
  // пока открыт любой оверлей, независимо от реальной прокрутки.
  const headerOpaque = scrolled || menuOpen || panelOpen;
  // heroTheme="dark" — раздел Hero тёмный/полноэкранный, до скролля нужен
  // светлый текст поверх фото; после скролла (или пока открыт оверлей)
  // навбар всегда становится светлым с тёмным текстом.
  const overDarkHero = heroTheme === "dark" && !headerOpaque;
  const panelRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Пока открыт мобильное меню или десктопная панель "Меню" — основная
  // страница не прокручивается (её положение восстанавливается точно при
  // закрытии), а сама панель зафиксирована относительно viewport и не
  // зависит от scroll/parallax/reveal остального сайта.
  useScrollLock(menuOpen || panelOpen);
  useFocusTrap(menuOpen, menuRef, () => setMenuOpen(false));
  useFocusTrap(panelOpen, panelRef, () => setPanelOpen(false));

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

          {/* Desktop nav — 3 постоянные ссылки + "Меню" для остального */}
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
              onClick={() => setPanelOpen(true)}
              aria-expanded={panelOpen}
              aria-controls="nav-secondary-panel"
              className={`text-sm tracking-wider transition-colors uppercase ${
                overDarkHero ? "text-cream/80 hover:text-cream" : "text-stone hover:text-graphite"
              }`}
            >
              Меню
            </button>
          </nav>

          {/* Burger (mobile) */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
            aria-expanded={menuOpen}
            aria-controls="nav-mobile-menu"
          >
            <span className={`block w-6 h-px transition-all ${overDarkHero ? "bg-cream" : "bg-graphite"} ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px transition-all ${overDarkHero ? "bg-cream" : "bg-graphite"} ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px transition-all ${overDarkHero ? "bg-cream" : "bg-graphite"} ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu — зафиксировано под верхней панелью относительно
          viewport (не в нормальном потоке хедера), своя внутренняя
          прокрутка, если ссылки не помещаются по высоте. z-index выше
          временного переключателя режима движения. */}
      {menuOpen && (
        <div
          ref={menuRef}
          id="nav-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Меню"
          className="md:hidden fixed left-0 right-0 top-16 bottom-0 z-[110] bg-white border-t border-fog px-6 py-6 flex flex-col gap-5 overflow-y-auto overscroll-contain"
        >
          {ALL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm tracking-wider text-stone hover:text-graphite transition-colors uppercase"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                scrollToAnchor(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 inline-flex justify-center px-5 py-3 bg-graphite text-cream text-sm tracking-wider uppercase hover:bg-charcoal transition-colors shrink-0"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              scrollToAnchor("#contact");
            }}
          >
            Обсудить проект
          </a>
        </div>
      )}

      {/* Десктопная "Меню" панель — второстепенные ссылки (design-system.md §9) */}
      {panelOpen && (
        <>
          <div
            className="hidden md:block fixed inset-0 z-[105] bg-graphite/40 transition-opacity duration-300"
            onClick={() => setPanelOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={panelRef}
            id="nav-secondary-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Дополнительное меню"
            className="hidden md:flex fixed top-0 right-0 bottom-0 z-[110] w-[360px] bg-graphite flex-col justify-between p-10 overflow-y-auto overscroll-contain"
          >
            <div>
              <div className="flex justify-end mb-16">
                <button
                  onClick={() => setPanelOpen(false)}
                  aria-label="Закрыть меню"
                  className="text-cream/70 hover:text-cream text-sm tracking-widest uppercase transition-colors"
                >
                  Закрыть ×
                </button>
              </div>
              <nav className="flex flex-col gap-8">
                {SECONDARY_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setPanelOpen(false);
                      scrollToAnchor(link.href);
                    }}
                    className="font-serif text-2xl leading-snug text-cream/90 hover:text-accent font-light transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
            <p className="text-silver/60 text-xs tracking-widest uppercase shrink-0">
              {studio.logoText}
            </p>
          </div>
        </>
      )}
    </Fragment>
  );
}
