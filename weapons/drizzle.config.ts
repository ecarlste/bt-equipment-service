import { defineConfig } from "drizzle-kit";

console.log(process.env);

export default defineConfig({
  out: "weapons/migrations",
  schema: "weapons/schema.ts",
  dialect: "postgresql",
});
