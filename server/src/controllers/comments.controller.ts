import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { comments, commentVotes } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "../db/db";
import { ApiError } from "../utils/apiError";

const getCommentsSchema = z.object({
  userId: z.coerce.number(),
  postId: z.coerce.number(),
});

type GetComments = z.infer<typeof getCommentsSchema>;

// add pagination to the comments per page 20 comments
export const getComments = asyncHandler(
  async (req: Request<{}, {}, GetComments>, res: Response) => {
    console.log("inside the signup");
    try {
      const { postId, userId } = getCommentsSchema.parse(req.body);

      const allComments = await db
        .select()
        .from(comments)
        .where(eq(comments.postId, postId))
        .leftJoin(commentVotes, eq(commentVotes.commentId, comments.id))
        .orderBy(desc(comments.createdAt));

      res.status(200).send({
        success: true,
        message: "comments retrived",
        data: allComments,
      });
    } catch (error: any) {
      console.error("coments retrival error", error);
      throw new ApiError(400, error.message || "error in retriving comments");
    }
  }
);

const postCommentSchema = z.object({
  userId: z.coerce.number(),
  postId: z.coerce.number(),
  content: z.string(),
});

type PostComment = z.infer<typeof postCommentSchema>;

export const postComments = asyncHandler(
  async (req: Request<{}, {}, PostComment>, res: Response) => {
    console.log("inside post comment");
    try {
      const commentsData = postCommentSchema.parse(req.body);

      await db.insert(comments).values(commentsData);

      res.status(200).send({
        success: true,
        message: "comment created successfully",
      });
    } catch (error: any) {
      console.error("error in creating comment", error);
      throw new ApiError(400, error.message || "error in creating comment");
    }
  }
);
