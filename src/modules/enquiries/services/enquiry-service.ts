import { db } from "@/lib/db";
import { enquiries } from "@/db/schema/legacy";
import { sendEnquiryEmail } from "@/lib/email";
import { eq, desc, count } from "drizzle-orm";

export class EnquiryService {
  async findAll(params: { page?: number; pageSize?: number; type?: string }) {
    const { page = 1, pageSize = 50, type } = params;
    const offset = (page - 1) * pageSize;

    const where = type ? eq(enquiries.type, type as any) : undefined;
    const [totalResult] = await db.select({ total: count() }).from(enquiries).where(where as any);
    const items = await db
      .select()
      .from(enquiries)
      .where(where as any)
      .orderBy(desc(enquiries.createdAt))
      .limit(pageSize)
      .offset(offset);

    return { items, total: totalResult?.total ?? 0, page, pageSize, totalPages: Math.ceil((totalResult?.total ?? 0) / pageSize) };
  }

  async create(data: typeof enquiries.$inferInsert) {
    const [result] = await db.insert(enquiries).values(data).returning();
    return result;
  }

  async delete(id: number) {
    await db.delete(enquiries).where(eq(enquiries.id, id));
    return { success: true };
  }

  async submitContact(data: {
    fullName: string; organisation?: string; email: string; phone?: string;
    service: string; message: string;
  }) {
    await Promise.all([
      sendEnquiryEmail({
        type: "contact", name: data.fullName, organisation: data.organisation,
        email: data.email, phone: data.phone, service: data.service, message: data.message,
      }),
      this.create({
        type: "contact", name: data.fullName, organisation: data.organisation,
        email: data.email, phone: data.phone, service: data.service, message: data.message,
      }),
    ]);
    return { success: true };
  }

  async submitGetStarted(data: {
    audienceType: string; name: string; email: string; extra?: string;
  }) {
    await Promise.all([
      sendEnquiryEmail({
        type: "get-started", name: data.name, email: data.email,
        audienceType: data.audienceType, extra: data.extra,
        message: `Get Started enquiry from ${data.name} (${data.audienceType}).`,
      }),
      this.create({
        type: "get-started", name: data.name, email: data.email,
        audienceType: data.audienceType, extra: data.extra,
        message: `Get Started enquiry from ${data.name} (${data.audienceType}).`,
      }),
    ]);
    return { success: true };
  }

  async getTypeCounts() {
    const all = await db.select({ type: enquiries.type }).from(enquiries);
    return all.reduce((acc, e) => {
      acc[e.type] = (acc[e.type] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
}

export const enquiryService = new EnquiryService();
