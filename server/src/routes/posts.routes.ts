import express from "express";
import {
  createPost,
  getPosts,
  getSiglePosts,
} from "../controllers/post.controller";

const postsRouter = express.Router();

postsRouter.get("/posts/get-posts", getPosts);
postsRouter.get("/posts/get-single-posts", getSiglePosts);
postsRouter.post("/posts/create-post", createPost);

export { postsRouter };
