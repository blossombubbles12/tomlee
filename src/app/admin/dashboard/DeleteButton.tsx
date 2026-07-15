"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/Toast";

interface DeleteButtonProps {
  onDelete: () => Promise<{ success: boolean; message: string }>;
}

export default function DeleteButton({ onDelete }: DeleteButtonProps) {
  const [deleting, setDeleting] = useState(false);
  const { showToast } = useToast();

  async function handleClick() {
    if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) return;
    setDeleting(true);
    try {
      const result = await onDelete();
      showToast(result.message, "success");
    } catch {
      showToast("Failed to delete record", "error");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <button type="button" disabled={deleting} onClick={handleClick}
      className={`inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
        deleting
          ? "text-text/20 cursor-not-allowed"
          : "text-text/30 hover:text-danger hover:bg-danger/5"
      }`} title="Delete">
      <Trash2 size={13} />
    </button>
  );
}
