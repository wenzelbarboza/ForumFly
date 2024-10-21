import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getSiglePosts,
  getUserPosts,
  votePost,
} from "../controllers/post.controller";
import { voteComment } from "../controllers/comments.controller";

const postsRouter = express.Router();

postsRouter.post("/posts/get-posts", getPosts);
postsRouter.post("/posts/get-single-post", getSiglePosts);
postsRouter.post("/posts/create-post", createPost);
postsRouter.post("/posts/vote-post", votePost);
postsRouter.post("/posts/get-user-post", getUserPosts);
postsRouter.delete("/posts/delete-post", deletePost);
// vote posts

export { postsRouter };
