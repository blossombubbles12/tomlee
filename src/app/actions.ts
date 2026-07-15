"use server";

import { revalidatePath } from "next/cache";
import { enquiryService } from "@/modules/enquiries/services/enquiry-service";

export interface ContactFormData {
  fullName: string;
  organisation?: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  return enquiryService.submitContact(data);
}

export interface GetStartedFormData {
  audienceType: "organisations" | "individuals" | "governments";
  name: string;
  email: string;
  extra?: string;
}

export async function submitGetStartedForm(data: GetStartedFormData) {
  const result = await enquiryService.submitGetStarted(data);
  revalidatePath("/get-started");
  return result;
}
