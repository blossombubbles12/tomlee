import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-5">
      {icon && <div className="w-14 h-14 rounded-full bg-surface flex items-center justify-center mb-4">{icon}</div>}
      <p className="text-sm font-medium text-text/40">{title}</p>
      {description && <p className="text-xs text-text/30 mt-1">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
