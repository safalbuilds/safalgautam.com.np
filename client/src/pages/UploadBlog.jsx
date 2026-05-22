import { useState } from "react";
import axios from "axios";
import { LuUpload } from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export const UploadBlog = () => {
  const [filename, setFilename] = useState("No file selected");
  const [filedata, setFiledata] = useState({
    file: null,
    name: "",
    type: "",
    updated_at: "",
    size: 0,
  });
  const isFileSelected = !!filename.file;
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilename(file.name);
      setFiledata({
        file: file,
        name: file.name,
        type: file.type,
        updated_at: file.lastModifiedDate,
        size: file.size,
      });
    }
  };
  const uploadBlog = async () => {
    if (!filedata.file) return;

    try {
      const formData = new FormData();
      formData.append("file", filedata.file);

      const res = axios.post(`${API}uploadblog`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Uploaded Successfully");
      setFilename("No file selected");
      setFiledata({
        file: null,
        name: "",
        type: "",
        updated_at: "",
        size: 0,
      });
    } catch (err) {
      console.log(err);
      toast.error("Error uploading");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex flex-col items-center gap-3">
        <h1 className="m-10 md:text-4xl text-2xl">
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
          type="file"
          id="blogfile"
          accept=".md"
          className="hidden"
          onChange={handleUpload}
        />

        <p className="text-sm">{filename}</p>
        <button
          onClick={uploadBlog}
          disabled={!filedata.file}
          className="bg-(--primary) w-50 h-10 md:text-2xl font-bold hover:opacity-80 rounded active:opacity-50 text-xl"
        >
          Upload
        </button>
      </div>
    </>
  );
};
