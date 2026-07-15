import { pgTable, serial, varchar, text, timestamp, integer, decimal, jsonb } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  countryId: integer("country_id"),
  representativeId: integer("representative_id").notNull(),
  programId: integer("program_id"),
  institution: varchar("institution", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull().default("enrolled"),
  amountPaid: decimal("amount_paid", { precision: 15, scale: 2 }).default("0"),
  currency: varchar("currency", { length: 10 }).default("USD"),
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"),
  enrollmentDate: timestamp("enrollment_date").notNull().defaultNow(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
