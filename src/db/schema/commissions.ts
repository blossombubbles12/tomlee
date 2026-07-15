import { pgTable, serial, varchar, timestamp, integer, decimal, text, jsonb } from "drizzle-orm/pg-core";

export const commissions = pgTable("commissions", {
  id: serial("id").primaryKey(),
  representativeId: integer("representative_id").notNull(),
  paymentId: integer("payment_id"),
  studentId: integer("student_id"),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  rate: decimal("rate", { precision: 5, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  approvedById: integer("approved_by_id"),
  approvedAt: timestamp("approved_at"),
  paidAt: timestamp("paid_at"),
  notes: text("notes"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
