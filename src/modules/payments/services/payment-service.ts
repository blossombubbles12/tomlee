import { db } from "@/lib/db";
import { payments } from "@/db/schema/payments";
import { representatives } from "@/db/schema/representatives";
import { eq, desc, count, and } from "drizzle-orm";

export class PaymentService {
  async findAll(params: {
    page?: number; pageSize?: number; status?: string; representativeId?: number; verified?: boolean;
  }) {
    const { page = 1, pageSize = 50, status, representativeId } = params;
    const offset = (page - 1) * pageSize;
    const conditions = [];

    if (status) conditions.push(eq(payments.status, status as any));
    if (representativeId) conditions.push(eq(payments.representativeId, representativeId));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [totalResult] = await db.select({ total: count() }).from(payments).where(where as any);
    const items = await db
      .select()
      .from(payments)
      .where(where as any)
      .orderBy(desc(payments.createdAt))
      .limit(pageSize)
      .offset(offset);

    return { items, total: totalResult?.total ?? 0, page, pageSize, totalPages: Math.ceil((totalResult?.total ?? 0) / pageSize) };
  }

  async create(data: typeof payments.$inferInsert) {
    const [result] = await db.insert(payments).values(data).returning();
    return result;
  }

  async verify(id: number, verifiedById: number) {
    const [result] = await db
      .update(payments)
      .set({ status: "verified", verifiedById, verifiedAt: new Date(), updatedAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    return result;
  }

  async getStats(representativeId?: number) {
    const where = representativeId ? eq(payments.representativeId, representativeId) : undefined;
    const [total] = await db.select({ value: count() }).from(payments).where(where as any);
    const [pending] = await db
      .select({ value: count() })
      .from(payments)
      .where(and(eq(payments.status, "pending"), ...(where ? [where] : [])) as any);
    return { total: total?.value ?? 0, pending: pending?.value ?? 0 };
  }
}

export const paymentService = new PaymentService();
