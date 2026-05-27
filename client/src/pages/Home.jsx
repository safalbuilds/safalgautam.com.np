import { Nav } from "../components/Navbar";
import { Introduction } from "./Intro";
import { Project } from "./Project";
import { Skills } from "./Skills";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "../components/Footer";

export const Home = () => {
  return (
    <div id="home">
      <Nav />
      <Introduction />
      <Project />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
