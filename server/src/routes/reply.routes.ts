import express from "express";
import { getReplys, postReply } from "../controllers/reply.controller";

const replyRouter = express.Router();

replyRouter.get("/reply/get-reply", getReplys);
replyRouter.get("/reply/post-reply", postReply);

export { replyRouter };
