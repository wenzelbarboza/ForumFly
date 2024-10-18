ALTER TABLE "ForumFly_comments" DROP CONSTRAINT "ForumFly_comments_post_id_ForumFly_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "ForumFly_replies" DROP CONSTRAINT "ForumFly_replies_comment_id_ForumFly_comments_id_fk";
--> statement-breakpoint
ALTER TABLE "ForumFly_votes" DROP CONSTRAINT "ForumFly_votes_post_id_ForumFly_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "ForumFly_votes" DROP CONSTRAINT "ForumFly_votes_comment_id_ForumFly_comments_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_comments" ADD CONSTRAINT "ForumFly_comments_post_id_ForumFly_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."ForumFly_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_replies" ADD CONSTRAINT "ForumFly_replies_comment_id_ForumFly_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."ForumFly_comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_votes" ADD CONSTRAINT "ForumFly_votes_post_id_ForumFly_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."ForumFly_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_votes" ADD CONSTRAINT "ForumFly_votes_comment_id_ForumFly_comments_id_fk" FOREIGN KEY ("comment_id") REFERENCES "public"."ForumFly_comments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
