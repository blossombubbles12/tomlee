import { Skeleton, SkeletonHeading } from "@/modules/shared/components/feedback/Skeleton";

export default function ApplicationDetailLoading() {
  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-500">
      <Skeleton className="h-4 w-40" />
      <div className="dashboard-card rounded-xl p-5">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div>
            <Skeleton className="h-5 w-48 mb-2" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="dashboard-card rounded-xl p-5">
          <SkeletonHeading className="mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="flex items-start gap-3 p-3 rounded-lg bg-surface/50">
                <Skeleton className="w-4 h-4 mt-1" />
                <div className="flex-1">
                  <Skeleton className="h-3 w-16 mb-1" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
