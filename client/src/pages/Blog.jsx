import { Link, useNavigate, useParams } from "react-router-dom";
import { Nav } from "../components/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { RingLoader } from "react-spinners";
import { Helmet, HelmetProvider } from "react-helmet-async";

const API = import.meta.env.VITE_API_URL;

export const Blog = () => {
  const params = useParams();
  const id = params.id;
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBlog = async () => {
      try {
        const res = await axios.get(`${API}/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [id]);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="bg-(--black2) rounded-3xl p-4 flex items-center justify-center">
            <RingLoader color="#ff5000" size={40} />
          </div>
        </div>
      ) : (
        <div>
          <HelmetProvider>
            <Helmet>
              <title>{blog.title}</title>
            </Helmet>
          </HelmetProvider>

          <Nav blog={true} />

          <div className="mt-20 md:w-4/5 m-auto  bg-(--black2) rounded-3xl md:px-12 md:py-24 px-6 py-8">
            <h1 className="text-center md:text-3xl text-2xl font-bold text-(--primary) mb-10">
              {blog.title}
            </h1>
            <span className="text-gray-500 ">
              Updated at: {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <div
              className="mt-5 flex prose prose-lg flex-col gap-5 text-4 blogcontent"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export const DeleteBlog = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const deleteblog = async () => {
    try {
      await axios.delete(API + "deleteblog/" + id);
      toast.success(`Blog : ${id} deleted successfully`);
      setTimeout(() => {
        navigate("/blogs");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Toaster position="top-center" />
      <div className="flex items-center flex-col gap-2">
        <div className="grid h-16 py-2">
          <p>Do you really want to delete?</p>
          <p>{id}</p>
        </div>
        <button
          className="w-50 h-1/3 bg-(--primary) text-2xl font-bold rounded"
          onClick={deleteblog}
        >
          Delete
        </button>
        <Link
          to="../blogs"
          className="w-50 h-1/3 text-(--primary) text-xl font-medium rounded text-center"
        >
          Return
        </Link>
      </div>
    </>
  );
};
