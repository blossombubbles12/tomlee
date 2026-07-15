import { db } from "@/lib/db";
import { admins } from "@/db/schema/legacy";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

export class SettingsService {
  async updateProfile(adminId: number, data: { name?: string; password?: string }) {
    const updates: Record<string, unknown> = {};
    if (data.name?.trim()) updates.name = data.name.trim();
    if (data.password?.trim()) {
      if (data.password.length < 6) {
        return { success: false, message: "Password must be at least 6 characters" };
      }
      updates.passwordHash = await hash(data.password, 12);
    }
    if (Object.keys(updates).length === 0) {
      return { success: true, message: "No changes made" };
    }
    await db.update(admins).set(updates).where(eq(admins.id, adminId));
    return { success: true, message: "Profile updated successfully" };
  }
}

export const settingsService = new SettingsService();
