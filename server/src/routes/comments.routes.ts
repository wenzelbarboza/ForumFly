import express from "express";
import {
  getComments,
  postComments,
  voteComment,
} from "../controllers/comments.controller";

const commentsRouter = express.Router();

commentsRouter.get("/comment/get-comments", getComments);
commentsRouter.post("/comment/post-comment", postComments);
commentsRouter.post("/comment/vote-comment", voteComment);

export { commentsRouter };
