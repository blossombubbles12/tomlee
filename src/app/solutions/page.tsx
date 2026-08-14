import { Metadata } from "next";
import SolutionsContent from "./SolutionsContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore Tomlee Home Care's integrated care services — personal home care, elderly & companion care, specialist care, and our care professional network.",
  alternates: { canonical: `${base}/solutions` },
  openGraph: {
    title: "Our Services | Tomlee Home Care",
    description: "Explore Tomlee Home Care's integrated care services — personal home care, elderly & companion care, specialist care, and more.",
    url: `${base}/solutions`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Our Services | Tomlee Home Care",
    description: "Explore Tomlee Home Care's integrated care services — home care, companion care, and specialist care.",
    images: ["/logo.png"],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tomlee Home Care Services",
  description: "Integrated home care services including personal care, elderly & companion care, specialist care, and our care professional network.",
  url: "https://tomleehomecare.ng/solutions",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Service", name: "Personal Home Care", provider: { "@type": "Organization", name: "Tomlee Home Care" }, description: "Dignified personal care and daily living support delivered in the comfort of home." } },
    { "@type": "ListItem", position: 2, item: { "@type": "Service", name: "Elderly & Companion Care", provider: { "@type": "Organization", name: "Tomlee Home Care" }, description: "Compassionate companion care and elderly support with trained care professionals." } },
    { "@type": "ListItem", position: 3, item: { "@type": "Service", name: "Specialist Care Services", provider: { "@type": "Organization", name: "Tomlee Home Care" }, description: "Specialist care for recovery, dementia support, and chronic condition management." } },
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
