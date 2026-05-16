import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Portfolio from "./sections/Portfolio";
import About from "./sections/About";
import Services from "./sections/Services";
import Process from "./sections/Process";
import Reviews from "./sections/Reviews";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Services />
        <Process />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
