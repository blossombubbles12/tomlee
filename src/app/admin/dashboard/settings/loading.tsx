import { Skeleton, SkeletonHeading } from "@/modules/shared/components/feedback/Skeleton";

export default function SettingsLoading() {
  return (
    <div className="space-y-5 max-w-lg animate-in fade-in duration-500">
      <div>
        <SkeletonHeading />
        <SkeletonHeading className="h-3 w-40 mt-1" />
      </div>
      <div className="dashboard-card rounded-xl p-5 md:p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-secondary/5">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div>
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          ))}
          <Skeleton className="h-10 w-32 rounded-lg mt-4" />
        </div>
      </div>
    </div>
  );
}
