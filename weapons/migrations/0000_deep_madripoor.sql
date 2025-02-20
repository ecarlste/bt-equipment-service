CREATE TYPE "public"."tech_rating" AS ENUM('A', 'B', 'C', 'D', 'E', 'F');--> statement-breakpoint
CREATE TABLE "weapon" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"heat" text NOT NULL,
	"damage" text NOT NULL,
	"range" text NOT NULL,
	"ammoPerTon" integer,
	"weight" real NOT NULL,
	"criticalSlots" integer NOT NULL,
	"techRating" "tech_rating" NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "weapon_name_unique" UNIQUE("name")
);
