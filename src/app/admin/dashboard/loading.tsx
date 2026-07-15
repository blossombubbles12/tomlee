import { SkeletonPage } from "@/modules/shared/components/feedback/Skeleton";

export default function DashboardLoading() {
  return <SkeletonPage cardCount={7} tableRows={6} />;
}
