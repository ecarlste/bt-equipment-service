import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "weapons/migrations",
  schema: "weapons/schema.ts",
  dialect: "postgresql",
});
