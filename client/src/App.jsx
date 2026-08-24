import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Blog } from "./pages/blog/Blog";
import { Blogs } from "./pages/blog/Blogs";
import { UploadBlog } from "./pages/blog/UploadBlog";
import { DeleteBlog } from "./pages/blog/DeleteBlog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          {import.meta.env.MODE != "production" && (
          <>
            <Route path="/uploadblog" element={<UploadBlog />} />
            <Route path="/deleteblog/:id" element={<DeleteBlog />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
