import express from "express";
import { getPosts, getSiglePosts } from "../controllers/post.controller";

const postsRouter = express.Router();

postsRouter.get("/posts/get-posts", getPosts);
postsRouter.get("/posts/get-single-posts", getSiglePosts);

export { postsRouter };
