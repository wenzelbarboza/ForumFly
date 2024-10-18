import express from "express";
import { getComments, postComments } from "../controllers/comments.controller";

const commentsRouter = express.Router();

commentsRouter.get("/comment/get-comments", getComments);
commentsRouter.post("/comment/post-comment", postComments);

export { commentsRouter };
