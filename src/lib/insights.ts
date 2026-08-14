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
    title: "Creating a Safe and Comfortable Home for Your Elderly Loved One",
    category: "Articles",
    excerpt: "Practical steps families can take to make the home safer, warmer, and more suited to the needs of an ageing parent or grandparent.",
    slug: "#",
    publishedAt: new Date(),
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    title: "Senior Living in Nigeria: What Families Should Know",
    category: "Senior Living Insights",
    excerpt: "A guide to how Nigerian families are approaching senior living — from home-based care to community support, and how to decide what's right.",
    slug: "#",
    publishedAt: new Date(),
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    title: "Everyday Home Care Tips: Keeping Your Loved One Comfortable",
    category: "Home Care Tips",
    excerpt: "Simple, compassionate daily routines that help elderly family members stay comfortable, engaged, and independent at home.",
    slug: "#",
    publishedAt: new Date(),
    isPlaceholder: true,
  },
  {
    id: "placeholder-4",
    title: "A Complete Guide for Family Caregivers",
    category: "Caregiver Resources",
    excerpt: "Everything a first-time family caregiver needs to know — from managing daily routines to finding professional support when it's needed.",
    slug: "#",
    publishedAt: new Date(),
    isPlaceholder: true,
  },
];

// Database removed — returns placeholder data directly.
export async function fetchInsightsFromDB(): Promise<Insight[]> {
  return PLACEHOLDER_INSIGHTS;
}