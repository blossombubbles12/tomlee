import { SkeletonHeading, SkeletonTable, SkeletonBadge } from "@/modules/shared/components/feedback/Skeleton";

export default function RepresentativesLoading() {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <SkeletonHeading />
          <SkeletonHeading className="h-3 w-32 mt-1" />
        </div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {[1, 2, 3, 4].map((i) => (
          <SkeletonBadge key={i} className="h-8 w-24" />
        ))}
      </div>
      <SkeletonTable rows={10} cols={8} />
    </div>
  );
}
