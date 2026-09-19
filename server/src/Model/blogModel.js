import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Blogs = mongoose.model("Blogs", blogSchema);
