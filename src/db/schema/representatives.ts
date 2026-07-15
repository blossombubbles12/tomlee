import { pgTable, serial, varchar, text, timestamp, integer, boolean, decimal, jsonb } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { countries } from "./countries";

export const representatives = pgTable("representatives", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  countryId: integer("country_id").notNull().references(() => countries.id),
  city: varchar("city", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  occupation: varchar("occupation", { length: 255 }),
  organisation: varchar("organisation", { length: 255 }),
  linkedin: varchar("linkedin", { length: 500 }),
  experience: text("experience"),
  areasOfInterest: text("areas_of_interest"),
  cvUrl: varchar("cv_url", { length: 500 }),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("10.00"),
  totalStudents: integer("total_students").default(0),
  totalRevenue: decimal("total_revenue", { precision: 15, scale: 2 }).default("0"),
  totalCommissions: decimal("total_commissions", { precision: 15, scale: 2 }).default("0"),
  approvedById: integer("approved_by_id"),
  approvedAt: timestamp("approved_at"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
