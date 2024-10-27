import express from "express";
import { getComments } from "../controllers/comments.controller";
import {
  deleteComment,
  deleteReply,
  getAllComments,
  getAllPosts,
  getAllReplies,
  deletePost,
} from "../controllers/admin.controllers";

const adminRouter = express.Router();

adminRouter.post("/admin/get-all-posts", getAllPosts);
adminRouter.post("/admin/get-all-comments", getAllComments);
adminRouter.post("/admin/get-all-replies", getAllReplies);
adminRouter.delete("/admin/delete-reply", deleteReply);
adminRouter.delete("/admin/delete-post", deletePost);
adminRouter.delete("/admin/delete-comment", deleteComment);

export { adminRouter };
