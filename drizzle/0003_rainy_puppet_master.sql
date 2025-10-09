ALTER TABLE "user" ADD COLUMN "login" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_login_unique" UNIQUE("login");