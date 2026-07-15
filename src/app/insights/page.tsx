import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import InsightsContent from "./InsightsContent";
import { fetchInsightsFromDB, PLACEHOLDER_INSIGHTS } from "@/lib/insights";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Insights",
  description: "Stay informed with industry trends, research reports, workforce insights, and career guides from World Impact Africa.",
  alternates: { canonical: `${base}/insights` },
  openGraph: {
    title: "Insights | World Impact Africa",
    description: "Industry trends, research reports, workforce insights, and career guides from World Impact Africa.",
    url: `${base}/insights`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Insights | World Impact Africa",
    description: "Industry trends, research reports, workforce insights, and career guides from World Impact Africa.",
    images: ["/wialogoicon.png"],
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
        subtitle="Articles, research reports, workforce insights, and career guides."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />
      <InsightsContent insights={insights} isPlaceholder={isPlaceholder} />
    </div>
  );
}
