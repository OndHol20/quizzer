import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const quizes = sqliteTable("quizes", {
  id: text().primaryKey(),
  data: text({ mode: "json" }).notNull(),
});
