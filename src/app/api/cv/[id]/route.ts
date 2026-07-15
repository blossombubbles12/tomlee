import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { representativeApplications } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [app] = await db
      .select()
      .from(representativeApplications)
      .where(eq(representativeApplications.id, parseInt(id)))
      .limit(1);

    if (!app?.cvUrl) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    let cvUrl = app.cvUrl.replace("/image/upload/", "/raw/upload/");
    cvUrl = cvUrl.replace(/(\.\w+)\1$/i, "$1");

    const response = await fetch(cvUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch CV" }, { status: 502 });
    }

    const blob = await response.blob();
    return new NextResponse(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=\"cv.pdf\"",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("[CV Proxy Error]", err);
    return NextResponse.json({ error: "Failed to serve CV" }, { status: 500 });
  }
}
