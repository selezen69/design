import { useState } from "react";
import ShowcaseFrame from "../components/showcase/ShowcaseFrame";
import CategorySection from "../components/showcase/CategorySection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../sections/Hero";
import Portfolio from "../sections/Portfolio";
import ProjectDetail from "../sections/ProjectDetail";
import About from "../sections/About";
import Services from "../sections/Services";
import Process from "../sections/Process";
import Reviews from "../sections/Reviews";
import Contact from "../sections/Contact";

/**
 * Точная копия композиции App.jsx: те же компоненты, то же состояние,
 * канонические id секций — единственный экземпляр каждого id на /showcase,
 * поэтому реальные ссылки (#portfolio, #contact и т.д.) из Navbar/Hero/
 * ProjectDetail корректно скроллят именно сюда, а не в случайный дубль.
 */
function FullPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Portfolio onSelectProject={setSelectedProject} />
        <About />
        <Services />
        <Process />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

/**
 * Живая связка «сетка портфолио → карточка проекта»: клик по проекту
 * открывает настоящий ProjectDetail внутри той же рамки, «Назад» закрывает.
 * Ничего не подделывается — это тот же поток, что и в реальном приложении.
 */
function PortfolioWithDetail({ id, initialType }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <Portfolio id={id} initialType={initialType} onSelectProject={setSelected} />
      {selected && (
        <ProjectDetail project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

const CATEGORIES = [
  { id: "cat-full-page", label: "Страница целиком" },
  { id: "cat-sections", label: "Секции лендинга" },
  { id: "cat-portfolio", label: "Портфолио и проект" },
  { id: "cat-navigation", label: "Навигация" },
];

export default function Showcase() {
  return (
    <div className="bg-fog min-h-screen">
      {/* Showcase header */}
      <header className="sticky top-0 z-40 bg-graphite text-cream">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <p className="text-accent text-xs tracking-[0.4em] uppercase mb-2">
            Showcase
          </p>
          <h1 className="font-serif text-2xl md:text-3xl font-light mb-4">
            Витрина страниц и состояний
          </h1>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="text-xs tracking-widest uppercase text-silver hover:text-white transition-colors"
              >
                {c.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <p className="max-w-7xl mx-auto px-6 pt-8 pb-2 text-stone text-sm leading-relaxed">
        Все карточки ниже — уменьшенные копии настоящих компонентов проекта
        (без изменений разметки и стилей), в том же окружении и с теми же
        данными, что и на реальном сайте. Экраны живые: кликайте по фильтрам
        портфолио, открывайте и закрывайте карточку проекта, заполняйте форму
        контакта — все переходы происходят внутри рамки и не уводят со
        страницы /showcase.
      </p>

      {/* 1. Full page composition */}
      <CategorySection
        id="cat-full-page"
        title="Страница целиком"
        description="Полная композиция главной страницы — тот же Navbar, состояние выбранного проекта и данные, что и в реальном App.jsx."
      >
        <div className="sm:col-span-2 lg:col-span-3">
          <ShowcaseFrame
            title="Главная страница"
            note="Navbar → Hero → Портфолио → О студии → Услуги → Этапы → Отзывы → Контакты → Footer. Ссылки навигации и клик по проекту работают по-настоящему."
            designWidth={1440}
            height={900}
          >
            <FullPage />
          </ShowcaseFrame>
        </div>
      </CategorySection>

      {/* 2. Landing sections */}
      <CategorySection
        id="cat-sections"
        title="Секции лендинга"
        description="Отдельные блоки главной страницы, включая все состояния формы контактов."
      >
        <ShowcaseFrame title="Hero" note="Заглавный экран" height={260}>
          <Hero />
        </ShowcaseFrame>

        <ShowcaseFrame title="О студии" note="About" height={340}>
          <About id="about-demo" />
        </ShowcaseFrame>

        <ShowcaseFrame title="Услуги" note="Services" height={360}>
          <Services id="services-demo" />
        </ShowcaseFrame>

        <ShowcaseFrame title="Этапы работы" note="Process" height={320}>
          <Process id="process-demo" />
        </ShowcaseFrame>

        <ShowcaseFrame
          title="Отзывы — пустое состояние"
          note="Реальных отзывов пока нет в данных студии, поэтому единственное существующее состояние — заглушка"
          height={220}
        >
          <Reviews id="reviews-demo" />
        </ShowcaseFrame>

        <ShowcaseFrame
          title="Контакты — заполнение"
          note="Живая форма: введите данные и нажмите «Отправить заявку», чтобы увидеть переход в состояния «отправка» → «успех»"
          height={420}
        >
          <Contact id="contact-demo-idle" initialStatus="idle" />
        </ShowcaseFrame>

        <ShowcaseFrame
          title="Контакты — отправка"
          note="Состояние sending (кнопка задизейблена) — возникает сразу после отправки формы"
          height={420}
        >
          <Contact id="contact-demo-sending" initialStatus="sending" />
        </ShowcaseFrame>

        <ShowcaseFrame
          title="Контакты — успех"
          note="Состояние done, показывается после отправки формы"
          height={420}
        >
          <Contact id="contact-demo-done" initialStatus="done" />
        </ShowcaseFrame>
      </CategorySection>

      {/* 3. Portfolio + project detail */}
      <CategorySection
        id="cat-portfolio"
        title="Портфолио и карточка проекта"
        description="Сетка портфолио с рабочими фильтрами. Кликните по любому проекту — откроется настоящая карточка проекта, «Назад к портфолио» закрывает её обратно."
      >
        <ShowcaseFrame
          title="Портфолио — «Все»"
          note="Фильтр по умолчанию. У части проектов (например, «Лофт в саду») не заполнены площадь, локация и год — карточка проекта отображает только то, что есть в данных."
          height={460}
        >
          <PortfolioWithDetail id="portfolio-demo-all" initialType="all" />
        </ShowcaseFrame>

        <ShowcaseFrame title="Портфолио — «Квартиры»" height={460}>
          <PortfolioWithDetail id="portfolio-demo-apartment" initialType="apartment" />
        </ShowcaseFrame>

        <ShowcaseFrame title="Портфолио — «Дома»" height={460}>
          <PortfolioWithDetail id="portfolio-demo-house" initialType="house" />
        </ShowcaseFrame>
      </CategorySection>

      {/* 4. Navigation */}
      <CategorySection
        id="cat-navigation"
        title="Навигация"
        description="Верхнее меню в обычном и проскролленном состоянии, футер. Ссылки ведут к разделам блока «Страница целиком» выше."
      >
        <ShowcaseFrame title="Navbar — вверху страницы" note="Прозрачный фон" height={90}>
          <Navbar initialScrolled={false} />
        </ShowcaseFrame>

        <ShowcaseFrame title="Navbar — при скролле" note="Белый фон, тень" height={90}>
          <Navbar initialScrolled={true} />
        </ShowcaseFrame>

        <ShowcaseFrame title="Footer" height={140}>
          <Footer />
        </ShowcaseFrame>
      </CategorySection>

      <div className="max-w-7xl mx-auto px-6 py-10 text-xs text-silver">
        /showcase — служебная страница, не связана с публичной навигацией сайта.
      </div>
    </div>
  );
}
