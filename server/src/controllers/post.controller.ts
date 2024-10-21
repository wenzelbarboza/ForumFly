import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { newUserProps } from "../models/user.models";
import { db } from "../db/db";
import { comments, posts, users, postVotes } from "../db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { ApiError } from "../utils/apiError";

type GetPosts = {
  userId: number;
};

export const getPosts = asyncHandler(
  async (req: Request<{}, {}, GetPosts>, res: Response) => {
    console.log("inside the signup");
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = 10;

      const offset = (page - 1) * pageSize;
      const paginatedPosts = await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          createdAt: posts.createdAt,
          upvotes:
            sql<number>`SUM(CASE WHEN ${postVotes.value} = 1 THEN 1 ELSE 0 END)`.as(
              "upvotes"
            ),
          downvotes:
            sql<number>`SUM(CASE WHEN ${postVotes.value} = -1 THEN 1 ELSE 0 END)`.as(
              "downvotes"
            ),
          commentCount: sql<number>`COUNT(${comments.id})`.as("commentCount"),
        })
        .from(posts)
        .leftJoin(postVotes, eq(posts.id, postVotes.postId))
        .leftJoin(comments, eq(posts.id, comments.postId))
        .groupBy(posts.id)
        .orderBy(desc(posts.createdAt))
        .limit(pageSize)
        .offset(offset);

      //     const any = await db
      //       .select()
      //       .from(posts)
      //       .leftJoin(votes, eq(posts.id, votes.postId))
      // .leftJoin(comments, eq(posts.id, comments.postId))
      //       .orderBy(desc(posts.createdAt))
      //       .limit(pageSize)
      //       .offset(offset);

      const totalPosts = await db.select({ count: count() }).from(posts);
      const totalPages = Math.ceil(totalPosts[0].count / pageSize);

      res.status(200).send({
        success: true,
        message: "posts retrived",
        data: {
          posts: paginatedPosts,
          currentPage: page,
          totalPages,
        },
      });
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      throw new ApiError(400, error.message || "error in fetching posts");
    }
  }
);

const getSinglePostSchema = z.object({
  userId: z.coerce.number(),
  postId: z.coerce.number(),
});

type GetSinglePost = z.infer<typeof getSinglePostSchema>;

export const getSiglePosts = asyncHandler(
  async (req: Request<{}, {}, GetSinglePost>, res: Response) => {
    console.log("inside the signup");
    try {
      const { postId, userId } = getSinglePostSchema.parse(req.body);

      const post = await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          createdAt: posts.createdAt,
          upvotes:
            sql<number>`SUM(CASE WHEN ${postVotes.value} = 1 THEN 1 ELSE 0 END)`.as(
              "upvotes"
            ),
          downvotes:
            sql<number>`SUM(CASE WHEN ${postVotes.value} = -1 THEN 1 ELSE 0 END)`.as(
              "downvotes"
            ),
        })
        .from(posts)
        .leftJoin(postVotes, eq(posts.id, postVotes.postId))
        .where(eq(posts.id, postId))
        .groupBy(posts.id);

      res.status(200).send({
        success: true,
        message: "post retrived",
        data: post[0],
      });
    } catch (error: any) {
      console.error("Error fetching post:", error);
      throw new ApiError(400, error.message || "error in fetching post");
    }
  }
);

const createPostSchema = z.object({
  userId: z.coerce.number(),
  content: z.string().min(1, "post content should have minimum one character"),
  title: z.string().min(1, "title should have minimum one chareacter"),
});

type CreatePost = z.infer<typeof createPostSchema>;

export const createPost = asyncHandler(
  async (req: Request<{}, {}, CreatePost>, res: Response) => {
    console.log("inside the create post");
    try {
      console.log(req.body);
      const postData = createPostSchema.parse(req.body);

      await db.insert(posts).values(postData);

      res.status(200).send({
        success: true,
        message: "post created successfully",
      });
    } catch (error: any) {
      console.error("post creation error", error);
      throw new ApiError(400, error.message || "error in creating post");
    }
  }
);

const votePostSchema = z.object({
  postId: z.coerce.number(),
  userId: z.coerce.number(),
  upVote: z.boolean(),
});

type VotePost = z.infer<typeof votePostSchema>;

export const votePost = asyncHandler(
  async (req: Request<{}, {}, VotePost>, res: Response) => {
    console.log("inside the signup");
    try {
      const { upVote, postId, userId } = votePostSchema.parse(req.body);

      const value = upVote ? 1 : -1;

      await db.insert(postVotes).values({
        postId,
        userId,
        value,
      });

      res.status(200).send({
        success: true,
        message: "upvote successfull",
      });
    } catch (error: any) {
      console.error("post upvote error", error);
      throw new ApiError(400, error.message || "post upvote error");
    }
  }
);
const getUserPostSchema = z.object({
  userId: z.coerce.number(),
});

type GetUserPosts = z.infer<typeof getUserPostSchema>;

export const getUserPosts = asyncHandler(
  async (req: Request<{}, {}, GetUserPosts>, res: Response) => {
    try {
      const { userId } = getUserPostSchema.parse(req.body);
      const userPosts = await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          createdAt: posts.createdAt,
        })
        .from(posts)
        .where(eq(posts.userId, userId))
        .orderBy(desc(posts.createdAt));

      res.status(200).json({
        success: true,
        message: "upvote successfull",
        data: userPosts,
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user's posts" });
    }
  }
);

const deleteUserPostSchema = z.object({
  userId: z.coerce.number(),
  postId: z.coerce.number(),
});

type DeleteUserPost = z.infer<typeof deleteUserPostSchema>;

export const deletePost = asyncHandler(
  async (req: Request<{}, {}, DeleteUserPost>, res: Response) => {
    try {
      const { userId, postId } = deleteUserPostSchema.parse(req.body);
      await db.delete(posts).where(eq(posts.id, postId));
      res.status(204).json({ message: "Post deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting post" });
    }
  }
);
