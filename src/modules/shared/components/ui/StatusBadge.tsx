interface StatusBadgeProps {
  status: string;
  config?: Record<string, { label: string; class: string }>;
  defaultClass?: string;
}

const DEFAULT_CONFIG: Record<string, { label: string; class: string }> = {
  pending: { label: "Pending", class: "badge-warning" },
  approved: { label: "Approved", class: "badge-success" },
  rejected: { label: "Rejected", class: "badge-danger" },
  active: { label: "Active", class: "badge-success" },
  inactive: { label: "Inactive", class: "badge-neutral" },
  draft: { label: "Draft", class: "badge-neutral" },
  published: { label: "Published", class: "badge-success" },
  archived: { label: "Archived", class: "badge-neutral" },
};

export function StatusBadge({ status, config, defaultClass = "badge-neutral" }: StatusBadgeProps) {
  const merged = { ...DEFAULT_CONFIG, ...config };
  const cfg = merged[status];
  return (
    <span className={`badge ${cfg?.class ?? defaultClass}`}>
      {cfg?.label ?? status}
    </span>
  );
}
