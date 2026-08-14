import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { admins } from "@/db/schema";
import { registerAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const existing = await db.select().from(admins).limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ message: "Admins already exist. Seed not needed." });
    }

    await registerAdmin(
      "admin@tomleehomecare.ng",
      "Super Admin",
      "Admin@2026",
      "superadmin"
    );

    return NextResponse.json({ success: true, message: "Super admin created: admin@tomleehomecare.ng / Admin@2026" });
  } catch (err) {
    console.error("[Seed Error]", err);
    return NextResponse.json({ error: "Seed failed" }, { status: 500 });
  }
}
