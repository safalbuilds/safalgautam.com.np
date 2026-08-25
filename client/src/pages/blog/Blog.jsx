import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RingLoader } from "react-spinners";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { marked } from "marked";

import { Nav } from "../../components/Navbar";
import { NotFound } from "../NotFound";

const API = import.meta.env.VITE_API_URL;

export const Blog = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await axios.get(`${API}/blog/${id}`);

        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);

        if (err.response?.status === 404) {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    };

    getBlog();
  }, [id]);

  if (!loading && (notFound || !blog)) {
    return <NotFound />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="bg-(--black2) rounded-3xl p-4 flex items-center justify-center">
          <RingLoader color="#ff5000" size={40} />
        </div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{blog.title}</title>
      </Helmet>

      <div>
        <Nav blog={true} />

        <div className="mt-20 md:w-4/5 m-auto bg-(--black2) rounded-3xl md:px-12 md:py-24 px-6 py-8">
          <h1 className="text-center md:text-3xl text-2xl font-bold text-(--primary) mb-10">
            {blog.title}
          </h1>

          <span className="text-gray-500">
            Updated at:{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>

          <div
            className="mt-5 flex prose prose-lg flex-col gap-5 blogcontent"
            dangerouslySetInnerHTML={{
              __html: marked.parse(blog.body),
            }}
          />
        </div>
      </div>
    </HelmetProvider>
  );
};