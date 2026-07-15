"use client";

import { useState } from "react";
import { useToast } from "@/components/Toast";
import { updateAdminProfile } from "./actions";

interface SettingsFormProps {
  email: string;
  name: string;
}

export default function SettingsForm({ email, name }: SettingsFormProps) {
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);
    try {
      const result = await updateAdminProfile(fd);
      showToast(result.message, result.success ? "success" : "error");
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">Email</label>
        <input type="email" value={email} disabled
          className="w-full border border-secondary/10 bg-surface/50 px-4 py-2.5 text-sm text-text/50 cursor-not-allowed rounded-lg" />
      </div>

      <div>
        <label className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">Name</label>
        <input type="text" name="name" defaultValue={name} required
          className="w-full border border-secondary/10 bg-white px-4 py-2.5 text-sm text-text rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
      </div>

      <div>
        <label className="block text-xs font-heading font-semibold text-text mb-1.5 uppercase tracking-wide">New Password</label>
        <input type="password" name="password" placeholder="Leave blank to keep current" minLength={6}
          className="w-full border border-secondary/10 bg-white px-4 py-2.5 text-sm text-text rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
        <p className="text-[10px] text-text/40 mt-1.5">Minimum 6 characters. Leave empty to keep your current password.</p>
      </div>

      <button type="submit" disabled={saving}
        className="bg-primary text-white px-6 py-2.5 text-sm font-heading font-semibold rounded-lg hover:bg-secondary transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-sm">
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
