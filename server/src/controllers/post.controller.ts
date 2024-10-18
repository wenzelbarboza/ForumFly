import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import z from "zod";
import { newUserProps } from "../models/user.models";
import { db } from "../db/db";
import { comments, posts, users, postVotes } from "../db/schema";
import { count, desc, eq, sql } from "drizzle-orm";
import { ApiError } from "../utils/apiError";

export const getPosts = asyncHandler(async (req: Request, res: Response) => {
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
        postVotes: postVotes.value,
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
});

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

      const singlePost = await db
        .select()
        .from(posts)
        .leftJoin(postVotes, eq(posts.id, postVotes.postId))
        .where(eq(posts.id, postId));

      res.status(200).send({
        success: true,
        message: "post retrived",
        data: singlePost[0],
      });
    } catch (error: any) {
      console.error("Error fetching post:", error);
      throw new ApiError(400, error.message || "error in fetching post");
    }
  }
);
