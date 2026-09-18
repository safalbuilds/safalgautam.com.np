import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

import { Blog } from "./pages/blog/Blog";
import { Blogs } from "./pages/blog/Blogs";
import { UploadBlog } from "./pages/blog/UploadBlog";
import { DeleteBlog } from "./pages/blog/DeleteBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Blog listing */}
        <Route path="/blogs" element={<Blogs />} />

        {/* Individual blog */}
        <Route path="/blog/:slug" element={<Blog />} />

        {import.meta.env.MODE !== "production" && (
          <>
            {/* Upload blog */}
            <Route path="/uploadblog" element={<UploadBlog />} />

            {/* Delete blog */}
            <Route path="/deleteblog/:slug" element={<DeleteBlog />} />
          </>
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;