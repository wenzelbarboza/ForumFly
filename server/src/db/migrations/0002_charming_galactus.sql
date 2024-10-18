CREATE TABLE IF NOT EXISTS "ForumFly_comment_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"comment_id" integer NOT NULL,
	"value" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ForumFly_post_votes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"post_id" integer NOT NULL,
	"value" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "ForumFly_votes";--> statement-breakpoint
ALTER TABLE "ForumFly_comments" ALTER COLUMN "post_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ForumFly_comments" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ForumFly_posts" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ForumFly_replies" ALTER COLUMN "comment_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ForumFly_replies" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_comment_votes" ADD CONSTRAINT "ForumFly_comment_votes_user_id_ForumFly_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ForumFly_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_comment_votes" ADD CONSTRAINT "ForumFly_comment_votes_comment_id_ForumFly_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."ForumFly_comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_post_votes" ADD CONSTRAINT "ForumFly_post_votes_user_id_ForumFly_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ForumFly_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_post_votes" ADD CONSTRAINT "ForumFly_post_votes_post_id_ForumFly_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."ForumFly_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
