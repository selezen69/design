import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroC from "./HeroC";
import PortfolioC from "./PortfolioC";
import AboutC from "./AboutC";
import ServicesC from "./ServicesC";
import ProcessC from "./ProcessC";
import ReviewsC from "./ReviewsC";
import ContactC from "./ContactC";

/**
 * Вариант C — «Авторская галерея».
 */
export default function HomeC({ onSelectProject }) {
  return (
    <>
      <Navbar heroTheme="dark" />
      <main>
        <HeroC />
        <PortfolioC onSelectProject={onSelectProject} />
        <AboutC />
        <ServicesC />
        <ProcessC />
        <ReviewsC />
        <ContactC />
      </main>
      <Footer />
    </>
  );
}
