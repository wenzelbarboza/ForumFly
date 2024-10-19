DO $$ BEGIN
 CREATE TYPE "public"."verification" AS ENUM('pending', 'verified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "ForumFly_posts" ADD COLUMN "verification" "verification" DEFAULT 'pending';