import { Metadata } from "next";
import CertificationsContent from "./CertificationsContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Elderly & Companion Care",
  description: "Tomlee Home Care provides certified elderly care and companion care programmes — with trained and vetted care professionals ready for flexible, 24/7 support.",
  alternates: { canonical: `${base}/certifications` },
  openGraph: {
    title: "Elderly & Companion Care | Tomlee Home Care",
    description: "Certified elderly care and companion care programmes with trained and vetted care professionals.",
    url: `${base}/certifications`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Elderly & Companion Care | Tomlee Home Care",
    description: "Certified elderly care and companion care programmes with trained and vetted care professionals.",
    images: ["/logo.png"],
  },
};

const certSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Elderly & Companion Care Programmes",
  description: "Certified elderly care and companion care programmes delivered by trained and vetted care professionals.",
  url: "https://tomleehomecare.ng/certifications",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "Elderly Companion Care", provider: { "@type": "Organization", name: "Tomlee Home Care" } } },
    { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "Live-in Care Professional", provider: { "@type": "Organization", name: "Tomlee Home Care" } } },
    { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Dementia & Memory Support Care", provider: { "@type": "Organization", name: "Tomlee Home Care" } } },
    { "@type": "ListItem", position: 4, item: { "@type": "Course", name: "Post-Surgical Recovery Care", provider: { "@type": "Organization", name: "Tomlee Home Care" } } },
    { "@type": "ListItem", position: 5, item: { "@type": "Course", name: "Advanced Personal Care Assistant", provider: { "@type": "Organization", name: "Tomlee Home Care" } } },
  ],
};

export default function CertificationsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(certSchema) }} />
      <CertificationsContent />
    </>
  );
}