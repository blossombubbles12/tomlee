import { db } from "@/lib/db";
import { students } from "@/db/schema/students";
import { representatives } from "@/db/schema/representatives";
import { programs } from "@/db/schema/programs";
import { eq, desc, count, and, sql } from "drizzle-orm";

export class StudentService {
  async findAll(params: {
    page?: number; pageSize?: number; status?: string;
    representativeId?: number; countryId?: number; search?: string;
  }) {
    const { page = 1, pageSize = 50, status, representativeId, countryId, search } = params;
    const offset = (page - 1) * pageSize;
    const conditions = [];

    if (status) conditions.push(eq(students.status, status as any));
    if (representativeId) conditions.push(eq(students.representativeId, representativeId));
    if (countryId) conditions.push(eq(students.countryId, countryId));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [totalResult] = await db
      .select({ total: count() })
      .from(students)
      .where(where as any);

    const items = await db
      .select()
      .from(students)
      .where(where as any)
      .orderBy(desc(students.createdAt))
      .limit(pageSize)
      .offset(offset);

    return { items, total: totalResult?.total ?? 0, page, pageSize, totalPages: Math.ceil((totalResult?.total ?? 0) / pageSize) };
  }

  async findById(id: number) {
    const [result] = await db
      .select()
      .from(students)
      .leftJoin(representatives, eq(students.representativeId, representatives.id))
      .leftJoin(programs, eq(students.programId, programs.id))
      .where(eq(students.id, id))
      .limit(1);
    return result ?? null;
  }

  async create(data: typeof students.$inferInsert) {
    const [result] = await db.insert(students).values(data).returning();
    if (result) {
      await db.update(representatives)
        .set({
          totalStudents: sql`${representatives.totalStudents} + 1`,
          totalRevenue: sql`${representatives.totalRevenue} + ${data.amountPaid ?? 0}`,
          updatedAt: new Date(),
        })
        .where(eq(representatives.id, data.representativeId));
    }
    return result;
  }

  async update(id: number, data: Partial<typeof students.$inferInsert>) {
    const [result] = await db
      .update(students)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(students.id, id))
      .returning();
    return result;
  }

  async delete(id: number) {
    await db.delete(students).where(eq(students.id, id));
    return { success: true };
  }

  async getStats(representativeId?: number) {
    const where = representativeId ? eq(students.representativeId, representativeId) : undefined;
    const [total] = await db.select({ value: count() }).from(students).where(where as any);
    const [enrolled] = await db
      .select({ value: count() })
      .from(students)
      .where(and(eq(students.status, "enrolled"), ...(where ? [where] : [])) as any);
    return { total: total?.value ?? 0, enrolled: enrolled?.value ?? 0 };
  }
}

export const studentService = new StudentService();
