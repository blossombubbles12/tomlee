import { NextRequest, NextResponse } from "next/server";
import { sendEnquiryEmail } from "@/lib/email";
import { db } from "@/lib/db";
import { enquiries } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, organisation, contactName, email, phone, trainingNeeds, participants, message } = body;

    if (!email || !message || !contactName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await Promise.all([
      sendEnquiryEmail({
        type: type || "corporate-training",
        organisation,
        contactName,
        email,
        phone,
        trainingNeeds,
        participants,
        message,
      }),
      db.insert(enquiries).values({
        type: type || "corporate-training",
        name: contactName,
        organisation,
        email,
        phone,
        trainingNeeds,
        participants,
        message,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Enquiries API Error]", err);
    return NextResponse.json({ error: "Failed to send enquiry" }, { status: 500 });
  }
}
