import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-scroll";

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