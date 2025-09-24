CREATE TABLE "repo" (
	"id" text PRIMARY KEY NOT NULL,
	"github_repo_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_repo" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"repo_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_repo" ADD CONSTRAINT "user_repo_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_repo" ADD CONSTRAINT "user_repo_repo_id_repo_id_fk" FOREIGN KEY ("repo_id") REFERENCES "public"."repo"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "github_repo_id_idx" ON "repo" USING btree ("github_repo_id");--> statement-breakpoint
CREATE UNIQUE INDEX "user_repo_idx" ON "user_repo" USING btree ("user_id","repo_id");