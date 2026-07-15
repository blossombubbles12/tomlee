"use server";

import { settingsService } from "@/modules/settings/services/settings-service";
import { authService } from "@/modules/auth/services/auth-service";

export async function updateAdminProfile(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const session = await authService.requireAuth();
    const name = formData.get("name") as string;
    const password = formData.get("password") as string;
    return await settingsService.updateProfile(session.id, { name, password });
  } catch {
    return { success: false, message: "Failed to update profile" };
  }
}
