import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull().default("contact"),
  name: varchar("name", { length: 255 }).notNull(),
  organisation: varchar("organisation", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  service: varchar("service", { length: 255 }),
  trainingNeeds: varchar("training_needs", { length: 255 }),
  participants: varchar("participants", { length: 100 }),
  audienceType: varchar("audience_type", { length: 50 }),
  extra: text("extra"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const representativeApplications = pgTable("representative_applications", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  country: varchar("country", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  occupation: varchar("occupation", { length: 255 }),
  organisation: varchar("organisation", { length: 255 }),
  linkedin: varchar("linkedin", { length: 500 }),
  experience: text("experience"),
  areasOfInterest: text("areas_of_interest"),
  cvUrl: varchar("cv_url", { length: 500 }),
  status: varchar("status", { length: 50 }).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
export type Admin = typeof admins.$inferSelect;
export type RepresentativeApplication = typeof representativeApplications.$inferSelect;
