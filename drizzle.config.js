import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite",
  schema: "db/*",
  dbCredentials: {
    url: "data.db",
  },
});
