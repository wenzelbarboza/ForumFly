import { relations, sql } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  pgTableCreator,
  integer,
  boolean,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `ForumFly_${name}`);

export const typeEnum = pgEnum("type", ["user", "admin"]);

// Fix updated at
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  type: typeEnum("type").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .references(() => posts.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const replies = pgTable("replies", {
  id: serial("id").primaryKey(),
  commentId: integer("comment_id")
    .references(() => comments.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Separated Post Votes Table
export const postVotes = pgTable("post_votes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  postId: integer("post_id")
    .references(() => posts.id, {
      onDelete: "cascade",
    })
    .notNull(),
  value: integer("value").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Separated Comment Votes Table
export const commentVotes = pgTable("comment_votes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  commentId: integer("comment_id")
    .references(() => comments.id, {
      onDelete: "cascade",
    })
    .notNull(),
  value: integer("value").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations between tables
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  postVotes: many(postVotes), // Reference to post votes
  commentVotes: many(commentVotes), // Reference to comment votes
  replies: many(replies),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  user: one(users, { fields: [posts.userId], references: [users.id] }),
  comments: many(comments),
  postVotes: many(postVotes), // Relationship with postVotes
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  user: one(users, { fields: [comments.userId], references: [users.id] }),
  replies: many(replies),
  commentVotes: many(commentVotes), // Relationship with commentVotes
}));

export const repliesRelations = relations(replies, ({ one }) => ({
  comment: one(comments, {
    fields: [replies.commentId],
    references: [comments.id],
  }),
  user: one(users, { fields: [replies.userId], references: [users.id] }),
}));

export const postVotesRelations = relations(postVotes, ({ one }) => ({
  user: one(users, { fields: [postVotes.userId], references: [users.id] }),
  post: one(posts, { fields: [postVotes.postId], references: [posts.id] }), // Relation for posts
}));

export const commentVotesRelations = relations(commentVotes, ({ one }) => ({
  user: one(users, { fields: [commentVotes.userId], references: [users.id] }),
  comment: one(comments, {
    fields: [commentVotes.commentId],
    references: [comments.id],
  }), // Relation for comments
}));
