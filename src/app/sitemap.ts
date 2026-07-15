import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://worldimpactafrica.com";
  return [
    { url: base,                           lastModified: new Date(), changeFrequency: "yearly",  priority: 1.0 },
    { url: `${base}/about`,                lastModified: new Date(), changeFrequency: "yearly",  priority: 0.8 },
    { url: `${base}/solutions`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/certifications`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/corporate-training`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/talent-solutions`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/insights`,             lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/get-started`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.7 },
    { url: `${base}/representatives`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/representatives/apply`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/representatives/dashboard`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/privacy`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/terms`,                lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
