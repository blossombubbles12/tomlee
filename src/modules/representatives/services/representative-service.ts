import { db } from "@/lib/db";
import { representatives } from "@/db/schema/representatives";
import { users } from "@/db/schema/auth";
import { countries } from "@/db/schema/countries";
import { eq, desc, sql, count } from "drizzle-orm";
import type { RepresentativeApplication } from "@/db/schema";

export class RepresentativeService {
  async findAll(params: { page?: number; pageSize?: number; status?: string; search?: string }) {
    const { page = 1, pageSize = 50, status, search } = params;
    const offset = (page - 1) * pageSize;

    let query = db
      .select()
      .from(representatives)
      .leftJoin(countries, eq(representatives.countryId, countries.id));

    if (status) {
      query = query.where(eq(representatives.status, status as any)) as any;
    }

    const items = await (query as any)
      .orderBy(desc(representatives.createdAt))
      .limit(pageSize)
      .offset(offset);

    const [totalResult] = await db
      .select({ total: count() })
      .from(representatives)
      .where(status ? eq(representatives.status, status as any) : undefined);

    return { items, total: totalResult?.total ?? 0, page, pageSize, totalPages: Math.ceil((totalResult?.total ?? 0) / pageSize) };
  }

  async findById(id: number) {
    const [result] = await db
      .select()
      .from(representatives)
      .leftJoin(countries, eq(representatives.countryId, countries.id))
      .where(eq(representatives.id, id))
      .limit(1);
    return result ?? null;
  }

  async findByEmail(email: string) {
    const [result] = await db
      .select()
      .from(representatives)
      .where(eq(representatives.email, email))
      .limit(1);
    return result ?? null;
  }

  async create(data: typeof representatives.$inferInsert) {
    const [result] = await db.insert(representatives).values(data).returning();
    return result;
  }

  async update(id: number, data: Partial<typeof representatives.$inferInsert>) {
    const [result] = await db
      .update(representatives)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(representatives.id, id))
      .returning();
    return result;
  }

  async approve(id: number, approvedById: number) {
    const [result] = await db
      .update(representatives)
      .set({
        status: "approved",
        approvedById,
        approvedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(representatives.id, id))
      .returning();
    return result;
  }

  async reject(id: number) {
    const [result] = await db
      .update(representatives)
      .set({ status: "rejected", updatedAt: new Date() })
      .where(eq(representatives.id, id))
      .returning();
    return result;
  }

  async getStats() {
    const [total] = await db.select({ value: count() }).from(representatives);
    const [pending] = await db.select({ value: count() }).from(representatives).where(eq(representatives.status, "pending"));
    const [approved] = await db.select({ value: count() }).from(representatives).where(eq(representatives.status, "approved"));
    const countriesResult = await db
      .select({ value: count() })
      .from(representatives)
      .where(eq(representatives.status, "approved"));
    const uniqueCountries = countriesResult[0]?.value ?? 0;

    return {
      total: total?.value ?? 0,
      pending: pending?.value ?? 0,
      approved: approved?.value ?? 0,
      uniqueCountries,
    };
  }

  async delete(id: number) {
    await db.delete(representatives).where(eq(representatives.id, id));
    return { success: true };
  }

  async getTopRepresentatives(limit = 5) {
    return db
      .select()
      .from(representatives)
      .where(eq(representatives.status, "approved"))
      .orderBy(desc(representatives.totalRevenue))
      .limit(limit);
  }
}

export const representativeService = new RepresentativeService();
