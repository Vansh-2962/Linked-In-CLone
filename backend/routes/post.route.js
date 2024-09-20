import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  createComment,
  createPost,
  deletePost,
  getFeedPosts,
  getPostById,
  likePost,
} from "../controllers/post.controller.js";
const router = express.Router();

router.get("/", isAuthenticated, getFeedPosts);
router.post("/create", isAuthenticated, createPost);
router.delete("/delete/:id", isAuthenticated, deletePost);
router.get("/:id", isAuthenticated, getPostById);
router.post("/:id/comment", isAuthenticated, createComment);
router.post("/:id/like", isAuthenticated, likePost);
export default router;
