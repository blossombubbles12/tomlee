import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InsightsContent from "./InsightsContent";
import { fetchInsightsFromDB, PLACEHOLDER_INSIGHTS } from "@/lib/insights";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Insights",
  description: "Stay informed with care guides, senior living insights, home care tips, and caregiver resources from Tomlee Home Care.",
  alternates: { canonical: `${base}/insights` },
  openGraph: {
    title: "Insights | Tomlee Home Care",
    description: "Care guides, senior living insights, home care tips, and caregiver resources from Tomlee Home Care.",
    url: `${base}/insights`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Insights | Tomlee Home Care",
    description: "Care guides, senior living insights, home care tips, and caregiver resources from Tomlee Home Care.",
    images: ["/logo.png"],
  },
};

export default async function InsightsPage() {
  let insights = await fetchInsightsFromDB();
  const isPlaceholder = insights.length === 0;
  if (isPlaceholder) insights = PLACEHOLDER_INSIGHTS;

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Insights"
        subtitle="Care guides, senior living insights, home care tips, and caregiver resources."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />
      <InsightsContent insights={insights} isPlaceholder={isPlaceholder} />
    </div>
  );
}