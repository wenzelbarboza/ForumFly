import { z } from "zod";
import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response } from "express";
import { comments, commentVotes, replies } from "../db/schema";
import { desc, eq, sql } from "drizzle-orm";
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

      const postComments = await db
        .select({
          id: comments.id,
          content: comments.content,
          createdAt: comments.createdAt,
          upvotes:
            sql<number>`SUM(CASE WHEN ${commentVotes.value} = 1 THEN 1 ELSE 0 END)`.as(
              "upvotes"
            ),
          downvotes:
            sql<number>`SUM(CASE WHEN ${commentVotes.value} = -1 THEN 1 ELSE 0 END)`.as(
              "downvotes"
            ),
        })
        .from(comments)
        .leftJoin(commentVotes, eq(comments.id, commentVotes.commentId))
        .where(eq(comments.postId, postId))
        .groupBy(comments.id)
        .orderBy(desc(comments.createdAt));

      const replyCountRes = await db
        .select({
          replyCount: sql<number>`COUNT(${replies.id})`.as("replyCount"),
          commentsId: comments.id,
        })
        .from(comments)
        .leftJoin(replies, eq(replies.commentId, comments.id))
        .where(eq(comments.postId, postId))
        .groupBy(comments.id);

      res.status(200).send({
        success: true,
        message: "comments retrived",
        data: {
          postComments,
          replyCount: replyCountRes,
        },
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

const voteCommentSchema = z.object({
  postId: z.coerce.number(),
  userId: z.coerce.number(),
  upVote: z.boolean(),
  commentId: z.coerce.number(),
});

type VoteComment = z.infer<typeof voteCommentSchema>;

export const voteComment = asyncHandler(
  async (req: Request<{}, {}, VoteComment>, res: Response) => {
    console.log("inside the signup");
    try {
      const { upVote, postId, userId, commentId } = voteCommentSchema.parse(
        req.body
      );

      const value = upVote ? 1 : -1;

      await db.insert(commentVotes).values({
        commentId,
        userId,
        value,
      });

      res.status(200).send({
        success: true,
        message: "upvote successfull",
      });
    } catch (error: any) {
      console.error("comment upvote error", error);
      throw new ApiError(400, error.message || "comment upvote error");
    }
  }
);
