import { Skeleton, SkeletonHeading } from "@/modules/shared/components/feedback/Skeleton";

export default function RepresentativeDetailLoading() {
  return (
    <div className="space-y-6 max-w-3xl animate-in fade-in duration-500">
      <Skeleton className="h-4 w-44" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="dashboard-card rounded-xl p-5">
          {i === 1 && (
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div>
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
          )}
          {i === 2 && (
            <>
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
            </>
          )}
          {i === 3 && (
            <>
              <SkeletonHeading className="mb-4" />
              <Skeleton className="h-20 w-full rounded-lg mb-4" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-6 w-28 rounded-full" />
                ))}
              </div>
            </>
          )}
          {i === 4 && (
            <>
              <SkeletonHeading className="mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="p-4 bg-surface/50 rounded-lg">
                    <Skeleton className="h-6 w-6 mx-auto mb-2" />
                    <Skeleton className="h-8 w-16 mx-auto mb-1" />
                    <Skeleton className="h-3 w-12 mx-auto" />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
