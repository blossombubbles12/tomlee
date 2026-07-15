import { pgTable, serial, varchar, text, timestamp, integer, decimal, jsonb } from "drizzle-orm/pg-core";

export const consultingLeads = pgTable("consulting_leads", {
  id: serial("id").primaryKey(),
  representativeId: integer("representative_id").notNull(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactName: varchar("contact_name", { length: 255 }).notNull(),
  contactEmail: varchar("contact_email", { length: 255 }).notNull(),
  contactPhone: varchar("contact_phone", { length: 50 }),
  service: varchar("service", { length: 255 }).notNull(),
  estimatedValue: decimal("estimated_value", { precision: 15, scale: 2 }),
  currency: varchar("currency", { length: 10 }).default("USD"),
  status: varchar("status", { length: 50 }).notNull().default("new"),
  notes: text("notes"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
