import Link from "next/link";
import { Insight } from "@/lib/insights";

interface InsightCardProps {
  insight: Insight;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Articles":           "bg-primary/10 text-primary",
  "Research Reports":   "bg-secondary/10 text-secondary",
  "Workforce Insights": "bg-blue-100 text-blue-700",
  "Career Guides":      "bg-purple-100 text-purple-700",
};

export default function InsightCard({ insight }: InsightCardProps) {
  const cardContent = (
    <div
      className={`h-full bg-white border p-6 flex flex-col transition-all duration-300 ${
        insight.isPlaceholder
          ? "border-dashed border-secondary/20 opacity-60"
          : "border-secondary/10 hover:border-primary/30 hover:shadow-md"
      }`}
      data-placeholder={insight.isPlaceholder ? "true" : undefined}
      data-category={insight.category}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            CATEGORY_COLORS[insight.category] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {insight.category}
        </span>
        <span className="text-xs text-text/60" data-testid="insight-date">
          {insight.publishedAt instanceof Date
            ? insight.publishedAt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
            : new Date(insight.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>
      <h3
        className={`text-base font-heading font-bold mb-3 leading-snug ${
          insight.isPlaceholder ? "text-text/60" : "text-text"
        }`}
      >
        {insight.title}
      </h3>
      <p
        className={`text-sm leading-relaxed flex-1 ${
          insight.isPlaceholder ? "text-text/30" : "text-text/80"
        }`}
      >
        {insight.excerpt}
      </p>
      {!insight.isPlaceholder && (
        <div className="mt-4 text-xs font-semibold text-primary uppercase tracking-widest">
          Read More →
        </div>
      )}
      {insight.isPlaceholder && (
        <div className="mt-4 text-xs text-text/30 uppercase tracking-widest">Coming Soon</div>
      )}
    </div>
  );

  if (insight.isPlaceholder || insight.slug === "#") {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <Link href={`/insights/${insight.slug}`} className="h-full block">
      {cardContent}
    </Link>
  );
}
