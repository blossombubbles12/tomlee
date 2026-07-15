import { db } from "@/lib/db";
import { enquiries } from "@/db/schema/legacy";
import { representatives } from "@/db/schema/representatives";
import { students } from "@/db/schema/students";
import { payments } from "@/db/schema/payments";
import { commissions } from "@/db/schema/commissions";
import { consultingLeads } from "@/db/schema/leads";
import { desc, eq, count, sql } from "drizzle-orm";

export interface DashboardStats {
  totalRepresentatives: number;
  pendingRepresentatives: number;
  approvedRepresentatives: number;
  activeCountries: number;
  totalStudents: number;
  totalRevenue: number;
  totalCommissions: number;
  pendingCommissions: number;
  consultingLeads: number;
  recentEnquiries: number;
}

export interface DashboardTrend {
  label: string;
  value: number;
  trend: number;
}

export class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const [repCount] = await db.select({ value: count() }).from(representatives);
    const [pendingReps] = await db.select({ value: count() }).from(representatives).where(eq(representatives.status, "pending"));
    const [approvedReps] = await db.select({ value: count() }).from(representatives).where(eq(representatives.status, "approved"));
    const [studentCount] = await db.select({ value: count() }).from(students);
    const [leadCount] = await db.select({ value: count() }).from(consultingLeads);
    const [enquiryCount] = await db.select({ value: count() }).from(enquiries);
    const [pendingComms] = await db.select({ value: count() }).from(commissions).where(eq(commissions.status, "pending"));

    const countriesResult = await db
      .select({ count: count() })
      .from(representatives)
      .where(eq(representatives.status, "approved"));

    return {
      totalRepresentatives: repCount?.value ?? 0,
      pendingRepresentatives: pendingReps?.value ?? 0,
      approvedRepresentatives: approvedReps?.value ?? 0,
      activeCountries: countriesResult[0]?.count ?? 0,
      totalStudents: studentCount?.value ?? 0,
      totalRevenue: 0,
      totalCommissions: 0,
      pendingCommissions: pendingComms?.value ?? 0,
      consultingLeads: leadCount?.value ?? 0,
      recentEnquiries: enquiryCount?.value ?? 0,
    };
  }

  async getRecentEnquiries(limit = 5) {
    return db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(limit);
  }

  async getRecentApplications(limit = 5) {
    return db.select().from(representatives).orderBy(desc(representatives.createdAt)).limit(limit);
  }

  async getTopCountries(limit = 5) {
    return db
      .select({
        country: representatives.countryId,
        count: count(),
      })
      .from(representatives)
      .where(eq(representatives.status, "approved"))
      .groupBy(representatives.countryId)
      .orderBy(desc(count()))
      .limit(limit);
  }
}

export const dashboardService = new DashboardService();
