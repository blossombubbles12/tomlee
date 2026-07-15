import { Skeleton, SkeletonHeading, SkeletonCard } from "@/modules/shared/components/feedback/Skeleton";

export default function ReportsLoading() {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div>
        <SkeletonHeading />
        <SkeletonHeading className="h-3 w-48 mt-1" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="dashboard-card rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-secondary/5">
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="p-5">
              <Skeleton className="h-40 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
