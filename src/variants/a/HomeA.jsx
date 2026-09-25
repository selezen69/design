import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HeroA from "./HeroA";
import PortfolioA from "./PortfolioA";
import AboutA from "./AboutA";
import ServicesA from "./ServicesA";
import ProcessA from "./ProcessA";
import ReviewsA from "./ReviewsA";
import ContactA from "./ContactA";

/**
 * Вариант A — «Кинематографический минимализм».
 */
export default function HomeA({ onSelectProject }) {
  return (
    <>
      <Navbar heroTheme="dark" />
      <main>
        <HeroA />
        <PortfolioA onSelectProject={onSelectProject} />
        <AboutA />
        <ServicesA />
        <ProcessA />
        <ReviewsA />
        <ContactA />
      </main>
      <Footer />
    </>
  );
}
