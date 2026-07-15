-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "enquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(50) DEFAULT 'contact' NOT NULL,
	"name" varchar(255) NOT NULL,
	"organisation" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"service" varchar(255),
	"training_needs" varchar(255),
	"participants" varchar(100),
	"audience_type" varchar(50),
	"extra" text,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"role" varchar(50) DEFAULT 'admin' NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "representative_applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"occupation" varchar(255),
	"organisation" varchar(255),
	"linkedin" varchar(500),
	"experience" text,
	"areas_of_interest" text,
	"cv_url" varchar(500),
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(10) NOT NULL,
	"region" varchar(100),
	"currency" varchar(10),
	"currency_symbol" varchar(10),
	"language" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"director_id" integer,
	"metadata" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "countries_name_unique" UNIQUE("name"),
	CONSTRAINT "countries_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "programs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(50) NOT NULL,
	"description" text,
	"category" varchar(100) NOT NULL,
	"duration" varchar(100),
	"fee" numeric(15, 2),
	"currency" varchar(10) DEFAULT 'USD',
	"commission_rate" numeric(5, 2) DEFAULT '10.00',
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "programs_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"country_id" integer,
	"representative_id" integer NOT NULL,
	"program_id" integer,
	"institution" varchar(255),
	"status" varchar(50) DEFAULT 'enrolled' NOT NULL,
	"amount_paid" numeric(15, 2) DEFAULT '0',
	"currency" varchar(10) DEFAULT 'USD',
	"payment_status" varchar(50) DEFAULT 'pending',
	"enrollment_date" timestamp DEFAULT now() NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer,
	"representative_id" integer NOT NULL,
	"amount" numeric(15, 2) NOT NULL,
	"currency" varchar(10) DEFAULT 'USD',
	"payment_method" varchar(50),
	"payment_reference" varchar(255),
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"evidence_url" varchar(500),
	"notes" text,
	"verified_by_id" integer,
	"verified_at" timestamp,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"representative_id" integer NOT NULL,
	"payment_id" integer,
	"student_id" integer,
	"amount" numeric(15, 2) NOT NULL,
	"rate" numeric(5, 2) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"approved_by_id" integer,
	"approved_at" timestamp,
	"paid_at" timestamp,
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consulting_leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"representative_id" integer NOT NULL,
	"company_name" varchar(255) NOT NULL,
	"contact_name" varchar(255) NOT NULL,
	"contact_email" varchar(255) NOT NULL,
	"contact_phone" varchar(50),
	"service" varchar(255) NOT NULL,
	"estimated_value" numeric(15, 2),
	"currency" varchar(10) DEFAULT 'USD',
	"status" varchar(50) DEFAULT 'new' NOT NULL,
	"notes" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "representatives" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"full_name" varchar(255) NOT NULL,
	"country_id" integer NOT NULL,
	"city" varchar(255) NOT NULL,
	"phone" varchar(50) NOT NULL,
	"email" varchar(255) NOT NULL,
	"occupation" varchar(255),
	"organisation" varchar(255),
	"linkedin" varchar(500),
	"experience" text,
	"areas_of_interest" text,
	"cv_url" varchar(500),
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"commission_rate" numeric(5, 2) DEFAULT '10.00',
	"total_students" integer DEFAULT 0,
	"total_revenue" numeric(15, 2) DEFAULT '0',
	"total_commissions" numeric(15, 2) DEFAULT '0',
	"approved_by_id" integer,
	"approved_at" timestamp,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "representatives_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "partnerships" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"organisation" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"country_id" integer,
	"type" varchar(100) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"agreement_url" varchar(500),
	"managed_by_id" integer,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'representative' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"country_id" integer,
	"representative_id" integer,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"token" varchar(500) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "representatives" ADD CONSTRAINT "representatives_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "representatives" ADD CONSTRAINT "representatives_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
*/