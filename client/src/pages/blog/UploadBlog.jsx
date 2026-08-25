import { useRef, useState } from "react";
import axios from "axios";
import { LuUpload } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export const UploadBlog = () => {
  const fileInputRef = useRef(null);

  const [filename, setFilename] = useState("No file selected");
  const [uploading, setUploading] = useState(false);

  const [filedata, setFiledata] = useState({
    file: null,
    name: "",
    type: "",
    updated_at: "",
    size: 0,
  });

  const isFileSelected = !!filedata.file;

  const handleUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".md")) {
      toast.error("Please select a Markdown (.md) file");

      e.target.value = "";
      return;
    }

    setFilename(file.name);

    setFiledata({
      file,
      name: file.name,
      type: file.type,
      updated_at: file.lastModified,
      size: file.size,
    });
  };

  const uploadBlog = async () => {
    if (!filedata.file || uploading) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", filedata.file);

      await axios.post(`${API}/uploadblog`, formData);

      toast.success("Uploaded Successfully");

      // Clear selected file
      setFilename("No file selected");

      setFiledata({
        file: null,
        name: "",
        type: "",
        updated_at: "",
        size: 0,
      });

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Upload error:", err);

      const message =
        err.response?.data?.message || "Error uploading blog";

      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="flex flex-col items-center gap-3">
        <h1 className="m-10 md:text-4xl text-2xl text-center">
          Upload a .md file to upload blog
        </h1>

        <label
          htmlFor="blogfile"
          className="cursor-pointer text-white px-5 py-2 font-semibold transition md:w-1/5 w-1/2 rounded-lg hover:-translate-y-2 flex items-center justify-center"
        >
          <LuUpload
            size={150}
            className={`transition-all duration-300 ease-in-out ${
              isFileSelected
                ? "text-(--primary) scale-110 animate-pulse"
                : ""
            }`}
          />
        </label>

        <input
          ref={fileInputRef}
          type="file"
          id="blogfile"
          accept=".md,text/markdown"
          className="hidden"
          onChange={handleUpload}
        />

        <p className="text-sm text-center max-w-[90%] break-all">
          {filename}
        </p>

        <button
          onClick={uploadBlog}
          disabled={!isFileSelected || uploading}
          className="bg-(--primary) w-50 h-10 md:text-2xl font-bold hover:opacity-80 rounded active:opacity-50 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </>
  );
};