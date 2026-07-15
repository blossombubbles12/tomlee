"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { representativeApplications } from "@/db/schema";

export interface RepAppFormData {
  fullName: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  occupation?: string;
  organisation?: string;
  linkedin?: string;
  experience?: string;
  areasOfInterest?: string;
  cvUrl?: string;
}

export async function submitRepApplication(data: RepAppFormData) {
  try {
    if (!data.fullName?.trim()) return { success: false, error: "Full name is required." };
    if (!data.country?.trim()) return { success: false, error: "Country is required." };
    if (!data.city?.trim()) return { success: false, error: "City is required." };
    if (!data.phone?.trim()) return { success: false, error: "Phone number is required." };
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return { success: false, error: "A valid email address is required." };
    }

    await db.insert(representativeApplications).values({
      fullName: data.fullName,
      country: data.country,
      city: data.city,
      phone: data.phone,
      email: data.email,
      occupation: data.occupation,
      organisation: data.organisation,
      linkedin: data.linkedin,
      experience: data.experience,
      areasOfInterest: data.areasOfInterest,
      cvUrl: data.cvUrl,
    });

    revalidatePath("/representatives/apply");
    return { success: true };
  } catch (err) {
    console.error("[Rep Application Error]", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
