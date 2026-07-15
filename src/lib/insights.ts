export interface Insight {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  slug: string;
  publishedAt: Date;
  isPlaceholder?: boolean;
}

export const PLACEHOLDER_INSIGHTS: Insight[] = [
  {
    id: "placeholder-1",
    title: "The Future of Work in Africa: Trends to Watch in 2025",
    category: "Articles",
    excerpt: "An exploration of how technology, policy, and demographic shifts are reshaping African labour markets and what organisations can do to prepare.",
    slug: "#",
    publishedAt: new Date(),
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    title: "Closing the Skills Gap: A Research Report on African Workforce Readiness",
    category: "Research Reports",
    excerpt: "Key findings from our analysis of workforce readiness across five African economies and actionable recommendations for HR leaders.",
    slug: "#",
    publishedAt: new Date(),
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    title: "Building High-Performance Teams in the Nigerian Banking Sector",
    category: "Workforce Insights",
    excerpt: "How leading banks in Nigeria are investing in structured training and certification to retain top talent and drive performance.",
    slug: "#",
    publishedAt: new Date(),
    isPlaceholder: true,
  },
  {
    id: "placeholder-4",
    title: "Your Path to Professional Certification: A Complete Guide",
    category: "Career Guides",
    excerpt: "Everything you need to know about choosing the right certification, preparing for exams, and advancing your career in Africa.",
    slug: "#",
    publishedAt: new Date(),
    isPlaceholder: true,
  },
];

// Database removed — returns placeholder data directly.
export async function fetchInsightsFromDB(): Promise<Insight[]> {
  return PLACEHOLDER_INSIGHTS;
}
