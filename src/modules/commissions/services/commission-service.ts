import { db } from "@/lib/db";
import { commissions } from "@/db/schema/commissions";
import { representatives } from "@/db/schema/representatives";
import { eq, desc, count, and, sql } from "drizzle-orm";

export class CommissionService {
  async findAll(params: {
    page?: number; pageSize?: number; status?: string; representativeId?: number;
  }) {
    const { page = 1, pageSize = 50, status, representativeId } = params;
    const offset = (page - 1) * pageSize;
    const conditions = [];

    if (status) conditions.push(eq(commissions.status, status as any));
    if (representativeId) conditions.push(eq(commissions.representativeId, representativeId));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [totalResult] = await db.select({ total: count() }).from(commissions).where(where as any);
    const items = await db
      .select()
      .from(commissions)
      .where(where as any)
      .orderBy(desc(commissions.createdAt))
      .limit(pageSize)
      .offset(offset);

    return { items, total: totalResult?.total ?? 0, page, pageSize, totalPages: Math.ceil((totalResult?.total ?? 0) / pageSize) };
  }

  async calculateAndCreate(paymentId: number, representativeId: number, amount: number, rate: number) {
    const commissionAmount = (amount * rate) / 100;
    const [result] = await db.insert(commissions).values({
      paymentId, representativeId, amount: String(commissionAmount) as any, rate: String(rate) as any, status: "pending",
    }).returning();

    await db.update(representatives)
      .set({
        totalCommissions: sql`${representatives.totalCommissions} + ${commissionAmount}`,
        updatedAt: new Date(),
      })
      .where(eq(representatives.id, representativeId));

    return result;
  }

  async approve(id: number, approvedById: number) {
    const [result] = await db
      .update(commissions)
      .set({ status: "approved", approvedById, approvedAt: new Date(), updatedAt: new Date() })
      .where(eq(commissions.id, id))
      .returning();
    return result;
  }

  async markPaid(id: number) {
    const [result] = await db
      .update(commissions)
      .set({ status: "paid", paidAt: new Date(), updatedAt: new Date() })
      .where(eq(commissions.id, id))
      .returning();
    return result;
  }

  async getStats(representativeId?: number) {
    const where = representativeId ? eq(commissions.representativeId, representativeId) : undefined;
    const [total] = await db.select({ value: count() }).from(commissions).where(where as any);
    const [pending] = await db
      .select({ value: count() })
      .from(commissions)
      .where(and(eq(commissions.status, "pending"), ...(where ? [where] : [])) as any);
    return { total: total?.value ?? 0, pending: pending?.value ?? 0 };
  }
}

export const commissionService = new CommissionService();
