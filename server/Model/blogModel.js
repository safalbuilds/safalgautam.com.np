import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Blogs = mongoose.model("Blogs", blogSchema);
