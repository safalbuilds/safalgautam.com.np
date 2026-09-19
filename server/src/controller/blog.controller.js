import { Blogs } from "../Model/blogModel.js";
import { createSlug } from "../utils/createSlug.js";

export const uploadBlog = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No Markdown file provided",
      });
    }

    const content = req.file.buffer.toString("utf-8");

    const lines = content.split("\n");

    // First line is the title
    const title = lines[0]
      .replace(/^#+\s*/, "")
      .trim();

    // Everything after the first line is the Markdown body
    const body = lines
      .slice(1)
      .join("\n")
      .trim();

    if (!title) {
      return res.status(400).json({
        message: "Markdown file must contain a title",
      });
    }

    const slug = createSlug(title);

    // Prevent duplicate slugs
    const existingBlog = await Blogs.findOne({ slug });

    if (existingBlog) {
      return res.status(409).json({
        message: "A blog with this title already exists",
      });
    }

    await Blogs.create({
      title,
      slug,
      body,
    });

    return res.status(201).json({
      message: `'${title}' added successfully`,
      slug,
    });
  } catch (err) {
    console.error("Error adding blog:", err);

    return res.status(500).json({
      message: "Error adding blog",
    });
  }
};

export const fetchBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find()
      .sort({ createdAt: -1 });

    return res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);

    return res.status(500).json({
      message: "Error fetching blogs",
    });
  }
};

export const fetchBlog = async (req, res) => {
  const { slug } = req.params;

  try {
    const blog = await Blogs.findOne({ slug });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);

    return res.status(500).json({
      message: "Error fetching blog",
    });
  }
};

export const deleteBlog = async (req, res) => {
  const { slug } = req.params;

  try {
    const blog = await Blogs.findOneAndDelete({ slug });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: `Blog '${slug}' deleted successfully`,
    });
  } catch (err) {
    console.error("Error deleting blog:", err);

    return res.status(500).json({
      message: "Error deleting blog",
    });
  }
};