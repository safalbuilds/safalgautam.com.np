import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export const DeleteBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const deleteBlog = async () => {
    try {
      setLoading(true);

      await axios.delete(`${API}/deleteblog/${id}`);

      toast.success(`Blog: ${id} deleted successfully`);

      setTimeout(() => {
        navigate("/blogs");
      }, 1000);
    } catch (err) {
      console.error("Error deleting blog:", err);

      if (err.response?.status === 404) {
        toast.error("Blog not found");
      } else {
        toast.error("Failed to delete blog");
      }
    } finally {
      setLoading(false);
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
          className="w-50 h-1/3 bg-(--primary) text-2xl font-bold rounded disabled:opacity-50"
          onClick={deleteBlog}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>

        <Link
          to="/blogs"
          className="w-50 h-1/3 text-(--primary) text-xl font-medium rounded text-center"
        >
          Return
        </Link>
      </div>
    </>
  );
};