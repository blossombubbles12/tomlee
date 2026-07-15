import { pgTable, serial, varchar, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  code: varchar("code", { length: 10 }).notNull().unique(),
  region: varchar("region", { length: 100 }),
  currency: varchar("currency", { length: 10 }),
  currencySymbol: varchar("currency_symbol", { length: 10 }),
  language: varchar("language", { length: 100 }),
  isActive: boolean("is_active").notNull().default(true),
  directorId: integer("director_id"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
