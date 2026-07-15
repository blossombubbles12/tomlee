import { Metadata } from "next";
import CertificationsContent from "./CertificationsContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Professional Certifications",
  description: "World Impact Africa offers industry-relevant professional certification programmes with training-based and exam-only pathways across business, technology, finance, and leadership.",
  alternates: { canonical: `${base}/certifications` },
  openGraph: {
    title: "Professional Certifications | World Impact Africa",
    description: "Industry-relevant professional certification programmes with training-based and exam-only pathways across Africa.",
    url: `${base}/certifications`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Professional Certifications | World Impact Africa",
    description: "Industry-relevant professional certification programmes with training-based and exam-only pathways.",
    images: ["/wialogoicon.png"],
  },
};

const certSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Professional Certification Programmes",
  description: "Industry-relevant professional certification programmes across business, technology, finance, and leadership.",
  url: "https://worldimpactafrica.com/certifications",
  itemListElement: [
    { "@type": "ListItem", position: 1, item: { "@type": "Course", name: "Certified Project Management Professional", provider: { "@type": "Organization", name: "World Impact Africa" } } },
    { "@type": "ListItem", position: 2, item: { "@type": "Course", name: "Certified Business Analyst", provider: { "@type": "Organization", name: "World Impact Africa" } } },
    { "@type": "ListItem", position: 3, item: { "@type": "Course", name: "Certified Digital Marketing Specialist", provider: { "@type": "Organization", name: "World Impact Africa" } } },
    { "@type": "ListItem", position: 4, item: { "@type": "Course", name: "Certified Data Analyst", provider: { "@type": "Organization", name: "World Impact Africa" } } },
    { "@type": "ListItem", position: 5, item: { "@type": "Course", name: "Certified HR Business Partner", provider: { "@type": "Organization", name: "World Impact Africa" } } },
    { "@type": "ListItem", position: 6, item: { "@type": "Course", name: "Certified Financial Analyst", provider: { "@type": "Organization", name: "World Impact Africa" } } },
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
