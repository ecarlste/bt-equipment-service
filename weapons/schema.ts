import {
  integer,
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { TechRating } from "../lib/tech-rating";
import { sql } from "drizzle-orm";
import { WeaponTypeEnum } from "../lib/weapon-type";

const weaponEnumValues = Object.values(WeaponTypeEnum) as [string, ...string[]];
export const weaponTypeEnum = pgEnum("weapon_type", weaponEnumValues);

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
  weaponType: weaponTypeEnum(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});
