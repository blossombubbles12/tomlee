import { SkeletonHeading, SkeletonTable, SkeletonInput, SkeletonBadge } from "@/modules/shared/components/feedback/Skeleton";

export default function EnquiriesLoading() {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <SkeletonHeading />
          <SkeletonHeading className="h-3 w-32 mt-1" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <SkeletonInput className="max-w-xs" />
        <div className="flex gap-1.5">
          {[1, 2, 3].map((i) => (
            <SkeletonBadge key={i} className="h-8 w-24" />
          ))}
        </div>
      </div>
      <SkeletonTable rows={8} cols={7} />
    </div>
  );
}
