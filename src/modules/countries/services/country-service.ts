import { db } from "@/lib/db";
import { countries } from "@/db/schema/countries";
import { representatives } from "@/db/schema/representatives";
import { eq, asc, count } from "drizzle-orm";

export class CountryService {
  async findAll() {
    return db.select().from(countries).orderBy(asc(countries.name));
  }

  async findById(id: number) {
    const [result] = await db.select().from(countries).where(eq(countries.id, id)).limit(1);
    return result ?? null;
  }

  async create(data: typeof countries.$inferInsert) {
    const [result] = await db.insert(countries).values(data).returning();
    return result;
  }

  async update(id: number, data: Partial<typeof countries.$inferInsert>) {
    const [result] = await db
      .update(countries)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(countries.id, id))
      .returning();
    return result;
  }

  async getRepresentativeCounts() {
    return db
      .select({
        countryId: representatives.countryId,
        count: count(),
      })
      .from(representatives)
      .groupBy(representatives.countryId);
  }

  async getActiveCountries() {
    const results = await db
      .select({
        id: countries.id,
        name: countries.name,
        code: countries.code,
        repCount: count(representatives.id),
      })
      .from(countries)
      .leftJoin(representatives, eq(representatives.countryId, countries.id))
      .groupBy(countries.id)
      .orderBy(asc(countries.name));
    return results;
  }
}

export const countryService = new CountryService();
