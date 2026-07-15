import { Metadata } from "next";
import SolutionsContent from "./SolutionsContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Our Solutions",
  description: "Explore World Impact Africa's integrated workforce development solutions — corporate training, professional certifications, and talent solutions.",
  alternates: { canonical: `${base}/solutions` },
  openGraph: {
    title: "Our Solutions | World Impact Africa",
    description: "Explore World Impact Africa's integrated workforce development solutions — corporate training, professional certifications, and talent solutions.",
    url: `${base}/solutions`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Our Solutions | World Impact Africa",
    description: "Explore World Impact Africa's workforce development solutions — training, certifications, and talent.",
    images: ["/wialogoicon.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "World Impact Africa Solutions",
  description: "Integrated workforce development solutions including corporate training, professional certifications, and talent solutions.",
  url: "https://worldimpactafrica.com/solutions",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Service", name: "Corporate Training Solutions", provider: { "@type": "Organization", name: "World Impact Africa" }, description: "Tailored training programmes in leadership, sales, digital skills, customer experience, and HR." } },
    { "@type": "ListItem", position: 2, item: { "@type": "Service", name: "Professional Certification Programs", provider: { "@type": "Organization", name: "World Impact Africa" }, description: "Industry-relevant certifications across business, technology, finance, and leadership." } },
    { "@type": "ListItem", position: 3, item: { "@type": "Service", name: "Talent & Workforce Solutions", provider: { "@type": "Organization", name: "World Impact Africa" }, description: "Graduate training, skills assessment, talent outsourcing, and workforce planning." } },
  ],
};

export default function SolutionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <SolutionsContent />
    </>
  );
}
