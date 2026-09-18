import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";

import { SideBar } from "./Sidebar";

export const Nav = ({ blog = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isdark, setDark] = useState(true);

  const toggleDayMode = () => {
    document.documentElement.classList.toggle("day");
    setDark(!isdark);
  };

  return (
    <>
      <nav className="navbar flex justify-between items-center px-4 md:px-10 py-4 backdrop-blur-md">
        <a
          href="/"
          className="group transition-colors duration-300 cursor-pointer"
          aria-label="Safal Gautam home"
        >
          <span className="text-(--primary) text-2xl">
            {"{"}{" "}
            <span className="font-bold text-(--white) group-hover:text-(--primary)">
              SaFal
            </span>{" "}
            {"}."}
          </span>
        </a>

        <ul className="nav-links hidden sm:flex gap-6">
          <li>
            <Link smooth to="/" className="nav-link">
              Home
            </Link>
          </li>

          <li>
            <Link smooth to="/#projects" className="nav-link">
              Projects
            </Link>
          </li>

          <li>
            <Link smooth to="/#skills" className="nav-link">
              Skills
            </Link>
          </li>

          <li>
            <Link smooth to="/#about" className="nav-link">
              About
            </Link>
          </li>

          <li>
            <Link smooth to="/blogs" className="nav-link">
              Blogs
            </Link>
          </li>

          <li>
            <Link smooth to="/#contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={isdark ? "Switch to light mode" : "Switch to dark mode"}
            className="group w-auto border px-4 py-2 rounded-2xl hover:scale-110 transition-transform"
            onClick={toggleDayMode}
          >
            {isdark ? (
              <MdSunny
                className="text-xl group-hover:rotate-45 transition-transform"
                aria-hidden="true"
              />
            ) : (
              <BsMoonStarsFill
                className="text-xl"
                aria-hidden="true"
              />
            )}
          </button>

          <button
            type="button"
            aria-label="Open navigation menu"
            className="sm:hidden flex items-center justify-center p-2 rounded-lg hover:scale-110 transition-transform border"
            onClick={() => setSidebarOpen(true)}
          >
            <GiHamburgerMenu
              size={22}
              aria-hidden="true"
            />
          </button>
        </div>
      </nav>

      <SideBar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
    </>
  );
};