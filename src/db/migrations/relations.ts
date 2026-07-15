import { relations } from "drizzle-orm/relations";
import { users, representatives, countries, sessions } from "./schema";

export const representativesRelations = relations(representatives, ({one}) => ({
	user: one(users, {
		fields: [representatives.userId],
		references: [users.id]
	}),
	country: one(countries, {
		fields: [representatives.countryId],
		references: [countries.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	representatives: many(representatives),
	sessions: many(sessions),
}));

export const countriesRelations = relations(countries, ({many}) => ({
	representatives: many(representatives),
}));

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));