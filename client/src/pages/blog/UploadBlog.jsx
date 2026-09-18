import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { FaUpload, FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const UploadBlog = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isFileSelected = !!file;

  const validateAndSetFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".md")) {
      toast.error("Please select a Markdown (.md) file");
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      toast.error("File is too large (max 5MB)");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    validateAndSetFile(selectedFile);
    if (!selectedFile) e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    validateAndSetFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const resetForm = () => {
    setFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadBlog = async () => {
    if (!file || uploading) return;

    try {
      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API}/blog/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percent);
        },
      });

      toast.success(res.data.message || "Uploaded Successfully");
      resetForm();
    } catch (err) {
      console.error("Upload error:", err);

      const message = err.response?.data?.message || "Error uploading blog";
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="flex flex-col items-center gap-3">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/blogs")}
          aria-label="Back to blogs"
          className="self-start ml-5 mt-5 flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-gray-100 text-gray-800 shadow-sm border border-gray-200 hover:bg-gray-200 hover:shadow transition-all duration-200 active:scale-95"
        >
          <FaArrowLeft size={14} />
          <span>Back</span>
        </button>

        <h1 className="m-10 md:text-4xl text-2xl text-center">
          Upload a .md file to upload blog
        </h1>

        <label
          htmlFor="blogfile"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          aria-label="Upload markdown file"
          className={`cursor-pointer text-white px-5 py-8 font-semibold transition-all duration-300 md:w-1/3 w-4/5 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 ${
            isDragging
              ? "border-(--primary) bg-(--primary)/10 scale-105"
              : "border-gray-300"
          }`}
        >
          <FaUpload
            size={100}
            className={`transition-transform duration-300 ease-in-out ${
              isFileSelected
                ? "text-(--primary) scale-110 animate-pulse"
                : "text-gray-400"
            }`}
          />
          <span className="text-sm text-gray-500 text-center">
            Drag & drop or click to browse
          </span>
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
          {file ? file.name : "No file selected"}
        </p>

        {uploading && (
          <div className="w-4/5 md:w-1/3 bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-(--primary) h-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        <button
          type="button"
          onClick={uploadBlog}
          disabled={!isFileSelected || uploading}
          className="bg-(--primary) w-50 h-10 md:text-2xl font-bold hover:opacity-80 rounded active:opacity-50 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? `Uploading... ${uploadProgress}%` : "Upload"}
        </button>
      </div>
    </>
  );
};