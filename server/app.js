import express from "express"
import multer from "multer";
import cors from "cors"
import { connectDatabase } from "./connection.js";

import { contact } from "./controller/contact.js";
import { uploadBlog, fetchBlogs, fetchBlog, deleteBlog } from "./controller/blog.js";

const app = express();
const Port = process.env.PORT || 3000
const storage = multer.memoryStorage()
const upload = multer({storage})
connectDatabase()

app.use(cors({
    origin: ["http://localhost:5173", "https://safalgautam.com.np", "https://www.safalgautam.com.np"],
}
))

app.use(express.json())

app.get("/", (req,res) => {
    res.send("API running Successfully")
})
app.post("/submit", contact);
app.get("/blogs", fetchBlogs);
app.get("/blog/:id", fetchBlog)
if(process.env.MODE != "production"){
    app.post("/uploadblog",upload.single("file"),uploadBlog);
    app.delete("/deleteblog/:id", deleteBlog)
}

app.listen(Port, () => {
    console.log("Server started on port 3000");
});
