import { Request, Response } from "express";
import { z } from "zod";
import { posts, comments, replies } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";

const idSchema = z.object({
  id: z.number().min(1, { message: "ID must be a positive number" }),
});

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await db.select().from(posts);
    res.json(allPosts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const allComments = await db.select().from(comments);
    res.json(allComments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const getAllReplies = async (req: Request, res: Response) => {
  try {
    const allReplies = await db.select().from(replies);
    res.json(allReplies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch replies" });
  }
};

const deletePostSchema = z.object({
  postId: z.coerce.number().min(1, { message: "ID must be a positive number" }),
});

type DeletePost = z.infer<typeof deletePostSchema>;

export const deletePost = async (
  req: Request<{}, {}, DeletePost>,
  res: Response
) => {
  try {
    const { postId } = deletePostSchema.parse(req.body);
    await db.delete(posts).where(eq(posts.id, postId));
    res.status(204).send();
  } catch (error: any) {
    res
      .status(400)
      .json({ error: error.message || "error in deleting the post" });
  }
};

const deleteCommentSchema = z.object({
  commentId: z.coerce
    .number()
    .min(1, { message: "ID must be a positive number" }),
});

type DeleteComment = z.infer<typeof deleteCommentSchema>;
export const deleteComment = async (
  req: Request<{}, {}, DeleteComment>,
  res: Response
) => {
  try {
    const { commentId } = deleteCommentSchema.parse(req.body);
    await db.delete(comments).where(eq(comments.id, commentId));
    res.status(204).send();
  } catch (error: any) {
    res
      .status(400)
      .json({ error: error.message || "error in deletig comment" });
  }
};

const deleteReplySchema = z.object({
  replyId: z.coerce
    .number()
    .min(1, { message: "ID must be a positive number" }),
});

type DeleteReply = z.infer<typeof deleteReplySchema>;

export const deleteReply = async (
  req: Request<{}, {}, DeleteReply>,
  res: Response
) => {
  try {
    const { replyId } = deleteReplySchema.parse(req.body);
    await db.delete(replies).where(eq(replies.id, replyId));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message || "error in deleting reply" });
  }
};
