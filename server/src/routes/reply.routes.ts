import express from "express";
import { getReplys, postReply } from "../controllers/reply.controller";

const replyRouter = express.Router();

replyRouter.post("/reply/get-reply", getReplys);
replyRouter.post("/reply/post-reply", postReply);

export { replyRouter };
