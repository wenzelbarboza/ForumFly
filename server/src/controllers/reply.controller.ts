import { Request, Response } from "express";
import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { db } from "../db/db";
import { replies } from "../db/schema";
import { eq } from "drizzle-orm";
import { ApiError } from "../utils/apiError";

const getReplySchema = z.object({
  userId: z.coerce.number(),
  commentId: z.coerce.number(),
});

type GetReply = z.infer<typeof getReplySchema>;

export const getReplys = asyncHandler(
  async (req: Request<{}, {}, GetReply>, res: Response) => {
    console.log("inside the getReply");
    try {
      const { commentId, userId } = getReplySchema.parse(req.body);

      const repliesRes = await db
        .select()
        .from(replies)
        .where(eq(replies.commentId, commentId));

      res.status(200).send({
        success: true,
        message: "reply retrived successfully",
        data: repliesRes,
      });
    } catch (error: any) {
      console.error("error in fetching replys: ", error);
      throw new ApiError(400, error.message || "error in fetching replys");
    }
  }
);

const postReplySchema = z.object({
  userId: z.coerce.number(),
  commentId: z.coerce.number(),
  content: z.string().min(1, "reply should contain minimum one character"),
});

type PostReply = z.infer<typeof postReplySchema>;

export const postReply = asyncHandler(
  async (req: Request<{}, {}, PostReply>, res: Response) => {
    console.log("inside the signup");
    try {
      const { commentId, userId, content } = postReplySchema.parse(req.body);

      await db.insert(replies).values({
        commentId,
        content,
        userId,
      });

      res.status(200).send({
        success: true,
        message: "reply posted successfully",
      });
    } catch (error: any) {
      console.error("error in posting reply", error);
      throw new ApiError(400, error.message || "error in posting reply");
    }
  }
);
