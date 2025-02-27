import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "weapons/migrations",
  schema: "weapons/schema.ts",
  dbCredentials: {
    url: process.env.POSTGRES_URL || "",
  },
  dialect: "postgresql",
});
