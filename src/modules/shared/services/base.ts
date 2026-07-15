import { db } from "@/lib/db";
import { asc, desc, count, eq, and } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { PaginatedResult, QueryParams } from "../types/common";

export abstract class BaseService<T extends Record<string, unknown>> {
  protected db = db;

  constructor(protected table: PgTable) {}

  async findAll(params: QueryParams = {}): Promise<PaginatedResult<T>> {
    const { page = 1, pageSize = 50, sortBy, sortOrder = "desc", status } = params;
    const offset = (page - 1) * pageSize;

    const t = this.table as any;
    let qb = this.db.select().from(t);
    let countQb = this.db.select({ total: count() }).from(t);

    if (status) {
      const cond = eq(t.status, status);
      qb = qb.where(cond) as any;
      countQb = countQb.where(cond) as any;
    }

    const [totalResult] = await countQb;
    const total = totalResult?.total ?? 0;

    if (sortBy && t[sortBy]) {
      qb = (sortOrder === "asc" ? qb.orderBy(asc(t[sortBy])) : qb.orderBy(desc(t[sortBy]))) as any;
    } else {
      qb = qb.orderBy(desc(t.createdAt)) as any;
    }

    const items = await qb.limit(pageSize).offset(offset) as T[];
    return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
  }

  async findById(id: number): Promise<T | null> {
    const results = await this.db
      .select()
      .from(this.table as any)
      .where(eq((this.table as any).id, id))
      .limit(1) as T[];
    return results[0] ?? null;
  }

  async create(data: Partial<T>): Promise<T> {
    const results = await this.db
      .insert(this.table as any)
      .values(data as any)
      .returning() as T[];
    return results[0];
  }

  async update(id: number, data: Partial<T>): Promise<T | null> {
    const results = await this.db
      .update(this.table as any)
      .set({ ...data, updatedAt: new Date() } as any)
      .where(eq((this.table as any).id, id))
      .returning() as T[];
    return results[0] ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const results = await this.db
      .delete(this.table as any)
      .where(eq((this.table as any).id, id))
      .returning({ id: (this.table as any).id });
    return results.length > 0;
  }
}
