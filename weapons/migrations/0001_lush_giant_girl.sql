CREATE TYPE "public"."weapon_type" AS ENUM('ballistic', 'energy', 'missile');--> statement-breakpoint
ALTER TABLE "weapon" ADD COLUMN "weaponType" "weapon_type";