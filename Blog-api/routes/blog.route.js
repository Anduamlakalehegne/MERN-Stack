import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  searchBlog,
  updateBlog,
} from "../controller/blog.controller.js";
import { verifyToken, verifyUser } from "../middleware/verifyUser.js";
import { uploadMiddleware } from "../middleware/uploadHandler.js";

export const blogRoute = express.Router();

blogRoute.use(verifyToken);

blogRoute.use(uploadMiddleware.single("posture"));

blogRoute.get("/", getAllBlog);
blogRoute.get("/:id", getBlog);
blogRoute.get("/search/:title", searchBlog);
blogRoute.post("/", createBlog);
blogRoute.put("/:id", verifyUser, updateBlog);
blogRoute.delete("/:id", verifyUser, deleteBlog);
