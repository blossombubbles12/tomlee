import { db } from "@/lib/db";
import { representatives } from "@/db/schema/representatives";
import { students } from "@/db/schema/students";
import { payments } from "@/db/schema/payments";
import { commissions } from "@/db/schema/commissions";
import { eq, count, sql, gte, lte, and } from "drizzle-orm";

export class ReportService {
  async getRepresentativeReport(representativeId: number, dateFrom?: Date, dateTo?: Date) {
    const conditions = [];
    conditions.push(eq(students.representativeId, representativeId));
    if (dateFrom) conditions.push(gte(students.createdAt, dateFrom));
    if (dateTo) conditions.push(lte(students.createdAt, dateTo));

    const studentStats = await db
      .select({
        total: count(),
        enrolled: sql`SUM(CASE WHEN ${students.status} = 'enrolled' THEN 1 ELSE 0 END)`,
        revenue: sql`COALESCE(SUM(${students.amountPaid}::numeric), 0)`,
      })
      .from(students)
      .where(and(...conditions) as any);

    const commissionStats = await db
      .select({
        total: count(),
        approved: sql`SUM(CASE WHEN ${commissions.status} = 'approved' THEN 1 ELSE 0 END)`,
        paid: sql`SUM(CASE WHEN ${commissions.status} = 'paid' THEN 1 ELSE 0 END)`,
        totalAmount: sql`COALESCE(SUM(${commissions.amount}::numeric), 0)`,
      })
      .from(commissions)
      .where(eq(commissions.representativeId, representativeId) as any);

    return { students: studentStats[0], commissions: commissionStats[0] };
  }

  async getCountryReport(countryId: number) {
    const repStats = await db
      .select({ total: count() })
      .from(representatives)
      .where(eq(representatives.countryId, countryId) as any);

    const studentStats = await db
      .select({
        total: count(),
        revenue: sql`COALESCE(SUM(${students.amountPaid}::numeric), 0)`,
      })
      .from(students)
      .where(eq(students.countryId, countryId) as any);

    return { representatives: repStats[0], students: studentStats[0] };
  }

  async getGlobalOverview() {
    const [totalReps] = await db.select({ value: count() }).from(representatives);
    const [totalStudents] = await db.select({ value: count() }).from(students);
    const [totalRevenue] = await db
      .select({ value: sql`COALESCE(SUM(${students.amountPaid}::numeric), 0)` })
      .from(students);
    const [totalCommissions] = await db
      .select({ value: sql`COALESCE(SUM(${commissions.amount}::numeric), 0)` })
      .from(commissions);

    return {
      totalRepresentatives: totalReps?.value ?? 0,
      totalStudents: totalStudents?.value ?? 0,
      totalRevenue: Number(totalRevenue?.value ?? 0),
      totalCommissions: Number(totalCommissions?.value ?? 0),
    };
  }
}

export const reportService = new ReportService();
