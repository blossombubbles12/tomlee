"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { representativeApplications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { enquiryService } from "@/modules/enquiries/services/enquiry-service";
import { representativeService } from "@/modules/representatives/services/representative-service";
import { studentService } from "@/modules/students/services/student-service";

export async function deleteEnquiry(id: number) {
  await enquiryService.delete(id);
  revalidatePath("/admin/dashboard/enquiries");
  revalidatePath("/admin/dashboard");
  return { success: true, message: "Enquiry deleted" };
}

export async function deleteApplication(id: number) {
  await db.delete(representativeApplications).where(eq(representativeApplications.id, id));
  revalidatePath("/admin/dashboard/applications");
  revalidatePath("/admin/dashboard");
  return { success: true, message: "Application deleted" };
}

export async function approveApplication(id: number) {
  await db
    .update(representativeApplications)
    .set({ status: "approved" })
    .where(eq(representativeApplications.id, id));
  revalidatePath("/admin/dashboard/applications");
  revalidatePath(`/admin/dashboard/applications/${id}`);
  revalidatePath("/admin/dashboard");
  return { success: true, message: "Application approved" };
}

export async function rejectApplication(id: number) {
  await db
    .update(representativeApplications)
    .set({ status: "rejected" })
    .where(eq(representativeApplications.id, id));
  revalidatePath("/admin/dashboard/applications");
  revalidatePath(`/admin/dashboard/applications/${id}`);
  revalidatePath("/admin/dashboard");
  return { success: true, message: "Application rejected" };
}

export async function deleteRepresentative(id: number) {
  await representativeService.delete(id);
  revalidatePath("/admin/dashboard/representatives");
  revalidatePath("/admin/dashboard");
  return { success: true, message: "Representative deleted" };
}

export async function deleteStudent(id: number) {
  await studentService.delete(id);
  revalidatePath("/admin/dashboard/students");
  revalidatePath("/admin/dashboard");
  return { success: true, message: "Student deleted" };
}
