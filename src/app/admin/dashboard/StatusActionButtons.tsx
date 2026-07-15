"use client";

import { useState } from "react";
import { Check, X, Loader } from "lucide-react";
import { useToast } from "@/components/Toast";

interface StatusActionButtonsProps {
  status: string;
  onApprove: () => Promise<{ success: boolean; message: string }>;
  onReject: () => Promise<{ success: boolean; message: string }>;
}

export default function StatusActionButtons({ status, onApprove, onReject }: StatusActionButtonsProps) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const { showToast } = useToast();

  if (status !== "pending") return null;

  async function handleApprove() {
    setLoading("approve");
    try {
      const result = await onApprove();
      showToast(result.message, "success");
    } catch {
      showToast("Failed to approve", "error");
    } finally {
      setLoading(null);
    }
  }

  async function handleReject() {
    if (!window.confirm("Reject this application? This can be changed later.")) return;
    setLoading("reject");
    try {
      const result = await onReject();
      showToast(result.message, "success");
    } catch {
      showToast("Failed to reject", "error");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={loading !== null}
        onClick={handleApprove}
        className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 px-3 py-1.5 text-xs font-medium rounded-md transition-colors disabled:opacity-50"
      >
        {loading === "approve" ? <Loader size={13} className="animate-spin" /> : <Check size={13} />}
        Approve
      </button>
      <button
        type="button"
        disabled={loading !== null}
        onClick={handleReject}
        className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-600 hover:bg-red-500/20 px-3 py-1.5 text-xs font-medium rounded-md transition-colors disabled:opacity-50"
      >
        {loading === "reject" ? <Loader size={13} className="animate-spin" /> : <X size={13} />}
        Reject
      </button>
    </div>
  );
}
