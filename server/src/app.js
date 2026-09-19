import express from "express";
import multer from "multer";
import cors from "cors";

import { connectDatabase } from "./utils/connection.js";
import blogRouter from "./routes/blog.routes.js";
import contactRouter from "./routes/contact.routes.js";

const app = express();

const storage = multer.memoryStorage();

export const upload = multer({ storage });

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://safalgautam.com.np",
      "https://www.safalgautam.com.np",
    ],
  }),
);

app.use(express.json());

app.get(["/", "/health"], (req, res) => {
  res.send("API running Successfully");
});

app.use("/api/blog", blogRouter);
app.use("/api/contact", contactRouter);

await connectDatabase();

export default app;