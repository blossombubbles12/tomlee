import { db } from "@/lib/db";
import { programs } from "@/db/schema/programs";
import { eq, asc, count } from "drizzle-orm";

export class ProgramService {
  async findAll() {
    return db.select().from(programs).where(eq(programs.isActive, true as any)).orderBy(asc(programs.name));
  }

  async findById(id: number) {
    const [result] = await db.select().from(programs).where(eq(programs.id, id)).limit(1);
    return result ?? null;
  }

  async create(data: typeof programs.$inferInsert) {
    const [result] = await db.insert(programs).values(data).returning();
    return result;
  }

  async update(id: number, data: Partial<typeof programs.$inferInsert>) {
    const [result] = await db
      .update(programs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(programs.id, id))
      .returning();
    return result;
  }
}

export const programService = new ProgramService();
