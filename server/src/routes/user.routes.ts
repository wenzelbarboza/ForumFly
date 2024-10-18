import express from "express";
import { signUp } from "../controllers/user.controllers";
import { verifyUser } from "../utils/verifyUser";

const userRouter = express.Router();
//api/v1/user/new
userRouter.post("/user/signup", signUp);

export { userRouter };
