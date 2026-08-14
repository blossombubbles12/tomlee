import { Metadata } from "next";
import { pickImages } from "@/lib/images";
import CorporateTrainingContent from "./CorporateTrainingContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Personal Home Care",
  description: "Tomlee Home Care delivers personalised home care services — assistance with daily living, mobility support, and comfort delivered by trained care professionals.",
  alternates: { canonical: `${base}/corporate-training` },
  openGraph: {
    title: "Personal Home Care | Tomlee Home Care",
    description: "Personalised home care services — daily living assistance, mobility support, and comfort delivered by trained care professionals.",
    url: `${base}/corporate-training`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Personal Home Care | Tomlee Home Care",
    description: "Personalised home care services delivered by trained care professionals.",
    images: ["/logo.png"],
  },
};

const trainingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Personal Home Care",
  provider: { "@type": "Organization", name: "Tomlee Home Care" },
  description: "Personalised home care services — daily living assistance, mobility support, and comfort delivered by trained care professionals.",
  areaServed: "Nigeria",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home Care Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Personal Care & Hygiene Assistance" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobility Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meal Preparation & Nutrition Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Medication Reminders" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Companionship & Emotional Support" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Household & Errand Assistance" } },
    ],
  },
};

export default function CorporateTrainingPage() {
  const images = pickImages(6);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trainingSchema) }} />
      <CorporateTrainingContent images={images} />
    </>
  );
}