interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200/60 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 1, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3 ${i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"}`} />
      ))}
    </div>
  );
}

export function SkeletonHeading({ className = "" }: { className?: string }) {
  return <Skeleton className={`h-5 w-48 ${className}`} />;
}

export function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-12 h-12" };
  return <Skeleton className={`${sizes[size]} rounded-full`} />;
}

export function SkeletonBadge({ className = "" }: { className?: string }) {
  return <Skeleton className={`h-5 w-16 rounded-full ${className}`} />;
}

export function SkeletonButton({ className = "" }: { className?: string }) {
  return <Skeleton className={`h-9 w-28 rounded-lg ${className}`} />;
}

export function SkeletonInput({ className = "" }: { className?: string }) {
  return <Skeleton className={`h-10 w-full rounded-lg ${className}`} />;
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`dashboard-card rounded-xl p-5 ${className}`} aria-hidden="true">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-24 mb-2" />
      <Skeleton className="h-3 w-20 mb-3" />
      <div className="flex items-center gap-1">
        <Skeleton className="h-3 w-12" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="dashboard-card rounded-xl overflow-hidden" aria-hidden="true">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface/50">
              {Array.from({ length: cols }).map((_, i) => (
                <th key={i} className="table-header">
                  <Skeleton className="h-3 w-20" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, r) => (
              <tr key={r} className="table-row">
                {Array.from({ length: cols }).map((_, c) => (
                  <td key={c} className="table-cell">
                    <Skeleton className={`h-3 ${c === 0 ? "w-28" : c === 1 ? "w-36" : "w-20"}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SkeletonKPIGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonPage({ cardCount = 4, tableRows = 5 }: { cardCount?: number; tableRows?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <SkeletonKPIGrid count={cardCount} />
      <SkeletonTable rows={tableRows} />
    </div>
  );
}
