import { Nav } from "../components/Navbar";
import { Introduction } from "./Introduction";
import { Project } from "./Project";
import { Skills } from "./Skills";
import { About } from "./About";
import { Contact } from "./Contact";
import { Footer } from "../components/Footer";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const element = document.getElementById(hash.slice(1));

    if (element) {
      element.scrollIntoView();
    }
  }, []);
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
};
