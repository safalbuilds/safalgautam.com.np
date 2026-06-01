import axios from "axios";
import { Nav } from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { Helmet, HelmetProvider } from "react-helmet-async";

const API = import.meta.env.VITE_API_URL;

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={"/blog/" + blog._id}
      className="p-10 rounded-2xl mt-10 bg-(--black2) shadow-lg hover:scale-105 md:w-[60%]"
    >
      <h1 className="md:text-3xl text-xl font-bold text-(--primary) mb-5 hover:underline transition-all ease-in-out duration-300 ">
        {blog.title}
      </h1>
      <span className="text-gray-500">
        Updated at: {new Date(blog.createdAt).toLocaleDateString()}
      </span>
      <div
        className="mt-5 prose line-clamp-3"
        dangerouslySetInnerHTML={{ __html: blog.body }}
      />
    </Link>
  );
};

export const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await axios.get(`${API}/blogs`);
        setBlog(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  console.log(blog)
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Blogs - Safal Gautam</title>
        </Helmet>
      </HelmetProvider>
      <Nav blog={true} />
      <h1 className="font-bold text-center mt-15 text-(--primary) text-3xl">
        My Blogs
      </h1>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="bg-(--black2) rounded-3xl p-4 flex items-center justify-center">
            <RingLoader color="#ff5000" size={40} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {blog.map((blog) => (
            <BlogCard blog={blog} key={blog._id} />
          ))}
        </div>
      )}
    </>
  );
};
