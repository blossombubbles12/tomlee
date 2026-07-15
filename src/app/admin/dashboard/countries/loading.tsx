import { SkeletonHeading, SkeletonTable } from "@/modules/shared/components/feedback/Skeleton";

export default function CountriesLoading() {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      <div>
        <SkeletonHeading />
        <SkeletonHeading className="h-3 w-32 mt-1" />
      </div>
      <SkeletonTable rows={10} cols={5} />
    </div>
  );
}
