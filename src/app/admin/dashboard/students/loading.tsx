import { SkeletonHeading, SkeletonTable, SkeletonKPIGrid } from "@/modules/shared/components/feedback/Skeleton";

export default function StudentsLoading() {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div>
        <SkeletonHeading />
        <SkeletonHeading className="h-3 w-32 mt-1" />
      </div>
      <SkeletonKPIGrid count={3} />
      <SkeletonTable rows={8} cols={6} />
    </div>
  );
}
