import type { Config } from "drizzle-kit";

export default {
  schema: [
    "./src/db/schema/legacy.ts",
    "./src/db/schema/auth.ts",
    "./src/db/schema/countries.ts",
    "./src/db/schema/representatives.ts",
    "./src/db/schema/programs.ts",
    "./src/db/schema/students.ts",
    "./src/db/schema/payments.ts",
    "./src/db/schema/commissions.ts",
    "./src/db/schema/leads.ts",
    "./src/db/schema/partnerships.ts",
  ],
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
