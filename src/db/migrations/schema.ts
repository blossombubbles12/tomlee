import { pgTable, serial, varchar, text, timestamp, unique, boolean, integer, numeric, jsonb, foreignKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const enquiries = pgTable("enquiries", {
	id: serial().primaryKey().notNull(),
	type: varchar({ length: 50 }).default('contact').notNull(),
	name: varchar({ length: 255 }).notNull(),
	organisation: varchar({ length: 255 }),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }),
	service: varchar({ length: 255 }),
	trainingNeeds: varchar("training_needs", { length: 255 }),
	participants: varchar({ length: 100 }),
	audienceType: varchar("audience_type", { length: 50 }),
	extra: text(),
	message: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const admins = pgTable("admins", {
	id: serial().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	role: varchar({ length: 50 }).default('admin').notNull(),
}, (table) => [
	unique("admins_email_unique").on(table.email),
]);

export const representativeApplications = pgTable("representative_applications", {
	id: serial().primaryKey().notNull(),
	fullName: varchar("full_name", { length: 255 }).notNull(),
	country: varchar({ length: 255 }).notNull(),
	city: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	occupation: varchar({ length: 255 }),
	organisation: varchar({ length: 255 }),
	linkedin: varchar({ length: 500 }),
	experience: text(),
	areasOfInterest: text("areas_of_interest"),
	cvUrl: varchar("cv_url", { length: 500 }),
	status: varchar({ length: 50 }).default('pending').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});

export const countries = pgTable("countries", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	code: varchar({ length: 10 }).notNull(),
	region: varchar({ length: 100 }),
	currency: varchar({ length: 10 }),
	currencySymbol: varchar("currency_symbol", { length: 10 }),
	language: varchar({ length: 100 }),
	isActive: boolean("is_active").default(true).notNull(),
	directorId: integer("director_id"),
	metadata: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("countries_name_unique").on(table.name),
	unique("countries_code_unique").on(table.code),
]);

export const programs = pgTable("programs", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	code: varchar({ length: 50 }).notNull(),
	description: text(),
	category: varchar({ length: 100 }).notNull(),
	duration: varchar({ length: 100 }),
	fee: numeric({ precision: 15, scale:  2 }),
	currency: varchar({ length: 10 }).default('USD'),
	commissionRate: numeric("commission_rate", { precision: 5, scale:  2 }).default('10.00'),
	isActive: boolean("is_active").default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("programs_code_unique").on(table.code),
]);

export const students = pgTable("students", {
	id: serial().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 255 }).notNull(),
	lastName: varchar("last_name", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }),
	countryId: integer("country_id"),
	representativeId: integer("representative_id").notNull(),
	programId: integer("program_id"),
	institution: varchar({ length: 255 }),
	status: varchar({ length: 50 }).default('enrolled').notNull(),
	amountPaid: numeric("amount_paid", { precision: 15, scale:  2 }).default('0'),
	currency: varchar({ length: 10 }).default('USD'),
	paymentStatus: varchar("payment_status", { length: 50 }).default('pending'),
	enrollmentDate: timestamp("enrollment_date", { mode: 'string' }).defaultNow().notNull(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const payments = pgTable("payments", {
	id: serial().primaryKey().notNull(),
	studentId: integer("student_id"),
	representativeId: integer("representative_id").notNull(),
	amount: numeric({ precision: 15, scale:  2 }).notNull(),
	currency: varchar({ length: 10 }).default('USD'),
	paymentMethod: varchar("payment_method", { length: 50 }),
	paymentReference: varchar("payment_reference", { length: 255 }),
	status: varchar({ length: 50 }).default('pending').notNull(),
	evidenceUrl: varchar("evidence_url", { length: 500 }),
	notes: text(),
	verifiedById: integer("verified_by_id"),
	verifiedAt: timestamp("verified_at", { mode: 'string' }),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const commissions = pgTable("commissions", {
	id: serial().primaryKey().notNull(),
	representativeId: integer("representative_id").notNull(),
	paymentId: integer("payment_id"),
	studentId: integer("student_id"),
	amount: numeric({ precision: 15, scale:  2 }).notNull(),
	rate: numeric({ precision: 5, scale:  2 }).notNull(),
	status: varchar({ length: 50 }).default('pending').notNull(),
	approvedById: integer("approved_by_id"),
	approvedAt: timestamp("approved_at", { mode: 'string' }),
	paidAt: timestamp("paid_at", { mode: 'string' }),
	notes: text(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const consultingLeads = pgTable("consulting_leads", {
	id: serial().primaryKey().notNull(),
	representativeId: integer("representative_id").notNull(),
	companyName: varchar("company_name", { length: 255 }).notNull(),
	contactName: varchar("contact_name", { length: 255 }).notNull(),
	contactEmail: varchar("contact_email", { length: 255 }).notNull(),
	contactPhone: varchar("contact_phone", { length: 50 }),
	service: varchar({ length: 255 }).notNull(),
	estimatedValue: numeric("estimated_value", { precision: 15, scale:  2 }),
	currency: varchar({ length: 10 }).default('USD'),
	status: varchar({ length: 50 }).default('new').notNull(),
	notes: text(),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const representatives = pgTable("representatives", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	fullName: varchar("full_name", { length: 255 }).notNull(),
	countryId: integer("country_id").notNull(),
	city: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	occupation: varchar({ length: 255 }),
	organisation: varchar({ length: 255 }),
	linkedin: varchar({ length: 500 }),
	experience: text(),
	areasOfInterest: text("areas_of_interest"),
	cvUrl: varchar("cv_url", { length: 500 }),
	status: varchar({ length: 50 }).default('pending').notNull(),
	commissionRate: numeric("commission_rate", { precision: 5, scale:  2 }).default('10.00'),
	totalStudents: integer("total_students").default(0),
	totalRevenue: numeric("total_revenue", { precision: 15, scale:  2 }).default('0'),
	totalCommissions: numeric("total_commissions", { precision: 15, scale:  2 }).default('0'),
	approvedById: integer("approved_by_id"),
	approvedAt: timestamp("approved_at", { mode: 'string' }),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "representatives_user_id_users_id_fk"
		}).onDelete("set null"),
	foreignKey({
			columns: [table.countryId],
			foreignColumns: [countries.id],
			name: "representatives_country_id_countries_id_fk"
		}),
	unique("representatives_email_unique").on(table.email),
]);

export const partnerships = pgTable("partnerships", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 255 }).notNull(),
	organisation: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }),
	countryId: integer("country_id"),
	type: varchar({ length: 100 }).notNull(),
	status: varchar({ length: 50 }).default('pending').notNull(),
	agreementUrl: varchar("agreement_url", { length: 500 }),
	managedById: integer("managed_by_id"),
	metadata: jsonb(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	passwordHash: varchar("password_hash", { length: 255 }).notNull(),
	role: varchar({ length: 50 }).default('representative').notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	countryId: integer("country_id"),
	representativeId: integer("representative_id"),
	lastLoginAt: timestamp("last_login_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const sessions = pgTable("sessions", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id").notNull(),
	token: varchar({ length: 500 }).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_user_id_users_id_fk"
		}).onDelete("cascade"),
]);
