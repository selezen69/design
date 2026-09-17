import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroB from "./HeroB";
import PortfolioB from "./PortfolioB";
import AboutB from "./AboutB";
import ServicesB from "./ServicesB";
import ProcessB from "./ProcessB";
import ValuesB from "./ValuesB";
import ContactB from "./ContactB";
import ScrollProgress from "../shared/ScrollProgress";
import { useMotionMode } from "../../hooks/useMotionMode";

/**
 * Вариант B — «Редакционный журнал» (утверждённое направление).
 * Ритм светлых/тёмных сцен: Hero(light) → Портфолио(light) → О студии(dark)
 * → Услуги(light) → Этапы(dark) → Что ценят наши клиенты(light) →
 * Контакты(dark) → Footer(dark) — принцип чередования взят из варианта C.
 */
export default function HomeB({ onSelectProject }) {
  const { lively } = useMotionMode();

  return (
    <>
      <Navbar heroTheme="light" />
      <ScrollProgress enabled={lively} />
      <main>
        <HeroB />
        <PortfolioB onSelectProject={onSelectProject} />
        <AboutB />
        <ServicesB />
        <ProcessB />
        <ValuesB />
        <ContactB />
      </main>
      <Footer />
    </>
  );
}
