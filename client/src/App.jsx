import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Blogs } from "./pages/Blogs";
import { UploadBlog } from "./pages/UploadBlog";
import { Blog, DeleteBlog } from "./pages/Blog";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          {import.meta.env.MODE !== "production" && (
          <>
            <Route path="/uploadblog" element={<UploadBlog />} />
            <Route path="/deleteblog/:id" element={<DeleteBlog />} />
          </>
        )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
