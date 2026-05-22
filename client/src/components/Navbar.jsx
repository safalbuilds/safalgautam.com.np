import { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { IoIosCloseCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdSunny } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";


export const SideBar = ({ isOpen, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-3/5 bg-(--black) z-50 p-6 flex flex-col gap-6
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"} sm:hidden pr-10 pt-5`}
    >
      <button
        className="self-end text-(--white) text-2xl font-bold hover:text-(--primary) active:rotate-45"
        onClick={closeSidebar}
      >
        <IoIosCloseCircle size={35} />
      </button>

      <Link smooth to="/#home" className="nav-link" onClick={closeSidebar}>
        Home
      </Link>
      <Link smooth to="/#projects" className="nav-link" onClick={closeSidebar}>
        Projects
      </Link>
      <Link smooth to="/#skills" className="nav-link" onClick={closeSidebar}>
        Skills
      </Link>
      <Link smooth to="/#about" className="nav-link" onClick={closeSidebar}>
        About
      </Link>
      <Link smooth to="/blogs" onClick={closeSidebar}>
        Blogs
      </Link>
      <Link smooth to="/#contact" className="nav-link" onClick={closeSidebar}>
        Contact
      </Link>
    </div>
  );
};

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
        <Link
          to="/"
          className="group transition-colors duration-300 cursor-pointer"
        >
          <h1 className="text-(--primary) text-2xl group-hover:text-(--white)">
            {"{"}{" "}
            <span className="font-bold text-(--white) group-hover:text-(--primary)">
              SaFal
            </span>{" "}
            {"}."}
          </h1>
        </Link>
        <ul className="nav-links hidden sm:flex gap-6">
          <li>
            <Link smooth to="/#home" className="nav-link">
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
            className="group transition w-auto border px-4 py-2 rounded-2xl hover:scale-110"
            onClick={toggleDayMode}
          >
            {isdark ? (
              <MdSunny className="text-xl group-hover:rotate-45 transition-transform" />
            ) : (
              <BsMoonStarsFill className="text-xl" />
            )}
          </button>

          <button
            className="sm:hidden flex items-center justify-center p-2 rounded-lg hover:scale-110 transition border"
            onClick={() => setSidebarOpen(true)}
          >
            <GiHamburgerMenu size={22} />
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
