import { Resend } from "resend";

export interface EnquiryEmail {
  type: string;
  organisation?: string;
  contactName?: string;
  name?: string;
  email: string;
  phone?: string;
  service?: string;
  trainingNeeds?: string;
  participants?: string;
  audienceType?: string;
  extra?: string;
  message: string;
}

const resend = new Resend(process.env.RESEND_API_KEY!);
const FROM = "WorldImpact Africa <noreply@worldimpactafrica.com>";
const TO = "info@worldimpactafrica.com";

function formatEnquiryBody(data: EnquiryEmail): string {
  const lines = [
    `Type: ${data.type}`,
    data.organisation ? `Organisation: ${data.organisation}` : "",
    data.contactName ? `Contact Person: ${data.contactName}` : "",
    data.name ? `Name: ${data.name}` : "",
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : "",
    data.service ? `Service: ${data.service}` : "",
    data.trainingNeeds ? `Training Needs: ${data.trainingNeeds}` : "",
    data.participants ? `Expected Participants: ${data.participants}` : "",
    data.audienceType ? `Audience Type: ${data.audienceType}` : "",
    data.extra ? `Extra Info: ${data.extra}` : "",
    "",
    "--- Message ---",
    data.message,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ];
  return lines.filter(Boolean).join("\n");
}

export async function sendEnquiryEmail(data: EnquiryEmail) {
  const text = formatEnquiryBody(data);
  await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `New Enquiry — ${data.type.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}`,
    text,
  });
}
