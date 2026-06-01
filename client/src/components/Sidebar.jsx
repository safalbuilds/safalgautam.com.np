import { IoIosCloseCircle } from "react-icons/io";
import { HashLink as Link } from "react-router-hash-link";

export const SideBar = ({ isOpen, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-3/5 bg-(--black) z-50 p-6 flex flex-col gap-6
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "translate-x-full"} sm:hidden pr-10 pt-5`}
    >
      <button
        className="self-end text-(--white) text-2xl font-bold hover:text-(--primary)"
        onClick={closeSidebar}
      >
        <IoIosCloseCircle size={35} />
      </button>

      <Link smooth to="/" onClick={closeSidebar} className="nav-link">
        Home
      </Link>

      <Link smooth to="/#projects" onClick={closeSidebar} className="nav-link">
        Projects
      </Link>

      <Link smooth to="/#skills" onClick={closeSidebar} className="nav-link">
        Skills
      </Link>

      <Link smooth to="/#about" onClick={closeSidebar} className="nav-link">
        About
      </Link>

      <Link smooth to="/blogs" onClick={closeSidebar} className="nav-link">
        Blogs
      </Link>

      <Link smooth to="/#contact" onClick={closeSidebar} className="nav-link">
        Contact
      </Link>
    </div>
  );
};