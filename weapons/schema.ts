import {
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { TechRating } from "../lib/TechRating";
import { sql } from "drizzle-orm";

const techRatingEnumValues = Object.values(TechRating) as [string, ...string[]];
export const techRatingEnum = pgEnum("tech_rating", techRatingEnumValues);

export const weapons = pgTable("weapon", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().unique().notNull(),
  heat: text().notNull(),
  damage: text().notNull(),
  range: text().notNull(),
  ammoPerTon: integer(),
  weight: real().notNull(),
  criticalSlots: integer().notNull(),
  techRating: techRatingEnum().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});
