import { db } from "@/lib/db";
import { consultingLeads } from "@/db/schema/leads";
import { eq, desc, count, and } from "drizzle-orm";

export class LeadService {
  async findAll(params: {
    page?: number; pageSize?: number; status?: string; representativeId?: number;
  }) {
    const { page = 1, pageSize = 50, status, representativeId } = params;
    const offset = (page - 1) * pageSize;
    const conditions = [];

    if (status) conditions.push(eq(consultingLeads.status, status as any));
    if (representativeId) conditions.push(eq(consultingLeads.representativeId, representativeId));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [totalResult] = await db.select({ total: count() }).from(consultingLeads).where(where as any);
    const items = await db
      .select()
      .from(consultingLeads)
      .where(where as any)
      .orderBy(desc(consultingLeads.createdAt))
      .limit(pageSize)
      .offset(offset);

    return { items, total: totalResult?.total ?? 0, page, pageSize, totalPages: Math.ceil((totalResult?.total ?? 0) / pageSize) };
  }

  async create(data: typeof consultingLeads.$inferInsert) {
    const [result] = await db.insert(consultingLeads).values(data).returning();
    return result;
  }

  async update(id: number, data: Partial<typeof consultingLeads.$inferInsert>) {
    const [result] = await db
      .update(consultingLeads)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(consultingLeads.id, id))
      .returning();
    return result;
  }

  async getStats(representativeId?: number) {
    const where = representativeId ? eq(consultingLeads.representativeId, representativeId) : undefined;
    const [total] = await db.select({ value: count() }).from(consultingLeads).where(where as any);
    const [won] = await db
      .select({ value: count() })
      .from(consultingLeads)
      .where(and(eq(consultingLeads.status, "won"), ...(where ? [where] : [])) as any);
    return { total: total?.value ?? 0, won: won?.value ?? 0 };
  }
}

export const leadService = new LeadService();
