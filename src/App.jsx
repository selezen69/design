import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import Portfolio from "./sections/Portfolio";
import ProjectDetail from "./sections/ProjectDetail";
import About from "./sections/About";
import Services from "./sections/Services";
import Process from "./sections/Process";
import Reviews from "./sections/Reviews";
import Contact from "./sections/Contact";

export default function App() {
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
