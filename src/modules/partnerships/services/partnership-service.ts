import { db } from "@/lib/db";
import { partnerships } from "@/db/schema/partnerships";
import { eq, desc, count, and } from "drizzle-orm";

export class PartnershipService {
  async findAll(params: { page?: number; pageSize?: number; status?: string; type?: string }) {
    const { page = 1, pageSize = 50, status, type } = params;
    const offset = (page - 1) * pageSize;
    const conditions = [];

    if (status) conditions.push(eq(partnerships.status, status as any));
    if (type) conditions.push(eq(partnerships.type, type as any));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [totalResult] = await db.select({ total: count() }).from(partnerships).where(where as any);
    const items = await db
      .select()
      .from(partnerships)
      .where(where as any)
      .orderBy(desc(partnerships.createdAt))
      .limit(pageSize)
      .offset(offset);

    return { items, total: totalResult?.total ?? 0, page, pageSize, totalPages: Math.ceil((totalResult?.total ?? 0) / pageSize) };
  }

  async create(data: typeof partnerships.$inferInsert) {
    const [result] = await db.insert(partnerships).values(data).returning();
    return result;
  }

  async update(id: number, data: Partial<typeof partnerships.$inferInsert>) {
    const [result] = await db
      .update(partnerships)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(partnerships.id, id))
      .returning();
    return result;
  }
}

export const partnershipService = new PartnershipService();
