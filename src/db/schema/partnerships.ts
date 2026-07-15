import { pgTable, serial, varchar, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

export const partnerships = pgTable("partnerships", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  organisation: varchar("organisation", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  countryId: integer("country_id"),
  type: varchar("type", { length: 100 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  agreementUrl: varchar("agreement_url", { length: 500 }),
  managedById: integer("managed_by_id"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
