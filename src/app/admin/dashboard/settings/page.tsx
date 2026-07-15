import { Metadata } from "next";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { admins } from "@/db/schema";
import { getSessionUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { Settings } from "lucide-react";
import SettingsForm from "./SettingsForm";

export const metadata: Metadata = {
  title: "Settings — WorldImpact Africa",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const session = await getSessionUser();
  if (!session) redirect("/admin");

  const [admin] = await db.select().from(admins).where(eq(admins.id, session.id)).limit(1);

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h1 className="text-xl font-heading font-bold text-text">Settings</h1>
        <p className="text-sm text-text/50 mt-0.5">Manage your admin profile</p>
      </div>

      <div className="dashboard-card rounded-xl p-5 md:p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-secondary/5">
          <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center">
            <Settings size={18} className="text-text/40" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-bold text-text">Profile Settings</h3>
            <p className="text-xs text-text/40">Update your name and password</p>
          </div>
        </div>
        <SettingsForm email={admin?.email || ""} name={admin?.name || ""} />
      </div>
    </div>
  );
}
