import express from "express";
import { getUser, signUp } from "../controllers/user.controllers";
import { verifyUser } from "../utils/verifyUser";
import { deletePost, getUserPosts } from "../controllers/post.controller";

const userRouter = express.Router();
//api/v1/user/new
userRouter.post("/user/signup", signUp);
userRouter.post("/user/get-user", getUser);
userRouter.post("/user/get-user-post", getUserPosts);
userRouter.delete("/user/delete-post", deletePost);

export { userRouter };
