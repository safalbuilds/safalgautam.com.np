import { Router } from "express";
import multer from "multer";

import * as blogController from "../controller/blog.controller.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.get("/", blogController.fetchBlogs);

router.get("/:slug", blogController.fetchBlog);

if (process.env.MODE !== "production") {
  router.post(
    "/upload",
    upload.single("file"),
    blogController.uploadBlog
  );

  router.delete(
    "/delete/:slug",
    blogController.deleteBlog
  );
}

export default router;