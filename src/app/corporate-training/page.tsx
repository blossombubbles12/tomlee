import { Metadata } from "next";
import { pickImages } from "@/lib/images";
import CorporateTrainingContent from "./CorporateTrainingContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Corporate Training Solutions",
  description: "World Impact Africa offers customised corporate training programmes in leadership, sales, digital skills, compliance, and HR across Africa.",
  alternates: { canonical: `${base}/corporate-training` },
  openGraph: {
    title: "Corporate Training Solutions | World Impact Africa",
    description: "Customised corporate training programmes in leadership, sales, digital skills, compliance, and HR across Africa.",
    url: `${base}/corporate-training`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Corporate Training Solutions | World Impact Africa",
    description: "Customised corporate training programmes in leadership, sales, digital skills, compliance, and HR across Africa.",
    images: ["/wialogoicon.png"],
  },
};

const trainingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Corporate Training Solutions",
  provider: { "@type": "Organization", name: "World Impact Africa" },
  description: "Customised corporate training programmes in leadership, sales, digital skills, compliance, and HR across Africa.",
  areaServed: "Africa",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Training Programmes",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Leadership Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Sales Performance Training" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Customer Experience Training" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Digital Skills Training" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "Compliance & Risk Training" } },
      { "@type": "Offer", itemOffered: { "@type": "Course", name: "HR & Workforce Development" } },
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
