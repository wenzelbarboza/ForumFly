DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumFly_comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_id" integer,
	"user_id" integer,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumFly_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumFly_replies" (
	"id" serial PRIMARY KEY NOT NULL,
	"comment_id" integer,
	"user_id" integer,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumFly_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "type" DEFAULT 'user',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "ForumFly_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumFly_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"post_id" integer,
	"comment_id" integer,
	"value" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_comments" ADD CONSTRAINT "ForumFly_comments_post_id_ForumFly_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."ForumFly_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_comments" ADD CONSTRAINT "ForumFly_comments_user_id_ForumFly_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ForumFly_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_posts" ADD CONSTRAINT "ForumFly_posts_user_id_ForumFly_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ForumFly_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_replies" ADD CONSTRAINT "ForumFly_replies_comment_id_ForumFly_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."ForumFly_comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_replies" ADD CONSTRAINT "ForumFly_replies_user_id_ForumFly_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ForumFly_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_votes" ADD CONSTRAINT "ForumFly_votes_user_id_ForumFly_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ForumFly_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_votes" ADD CONSTRAINT "ForumFly_votes_post_id_ForumFly_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."ForumFly_posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_votes" ADD CONSTRAINT "ForumFly_votes_comment_id_ForumFly_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."ForumFly_comments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
