"use client";

import Image from "next/image";
import InsightCard from "@/components/InsightCard";
import { Insight } from "@/lib/insights";

const CATEGORIES = ["Articles", "Research Reports", "Workforce Insights", "Career Guides"];

const CATEGORY_IMAGES: Record<string, string> = {
  "Articles":           "https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "Research Reports":   "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "Workforce Insights": "https://images.unsplash.com/photo-1573164574511-73c773193279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  "Career Guides":      "https://images.unsplash.com/photo-1655720357872-ce227e4164ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
};

interface InsightsContentProps {
  insights: Insight[];
  isPlaceholder: boolean;
}

export default function InsightsContent({ insights, isPlaceholder }: InsightsContentProps) {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-surface">
      <div className="container mx-auto">
        {isPlaceholder && (
          <div className="mb-10 px-4 py-3 bg-primary/5 border border-primary/10 text-sm text-text/80">
            Content coming soon. Check back for the latest articles, research, and workforce insights from World Impact Africa.
          </div>
        )}

        {CATEGORIES.map((cat) => {
          const catInsights = insights.filter((i) => i.category === cat);
          if (catInsights.length === 0) return null;
          return (
            <div key={cat} className="mb-20">
              {/* Category header with image banner */}
              <div className="relative h-28 mb-8 overflow-hidden">
                <Image
                  src={CATEGORY_IMAGES[cat] ?? CATEGORY_IMAGES["Articles"]}
                  alt={`${cat} category banner`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-secondary/75" />
                <div className="absolute inset-0 flex items-center px-8 gap-4">
                  <div className="w-8 h-[2px] bg-primary" />
                  <h2 className="text-xl font-heading font-bold text-white uppercase tracking-wide">{cat}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {catInsights.map((insight) => (
                  <InsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
