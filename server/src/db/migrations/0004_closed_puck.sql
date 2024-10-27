ALTER TABLE "ForumFly_replies" ADD COLUMN "post_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ForumFly_replies" ADD CONSTRAINT "ForumFly_replies_post_id_ForumFly_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."ForumFly_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
