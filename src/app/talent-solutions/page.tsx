import { Metadata } from "next";
import TalentSolutionsContent from "./TalentSolutionsContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Specialist Care Services",
  description: "Tomlee Home Care connects families with vetted, trained specialist care professionals — dementia support, recovery care, and chronic condition management.",
  alternates: { canonical: `${base}/talent-solutions` },
  openGraph: {
    title: "Specialist Care Services | Tomlee Home Care",
    description: "Connect with vetted, trained specialist care professionals — dementia support, recovery care, and chronic condition management.",
    url: `${base}/talent-solutions`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Specialist Care Services | Tomlee Home Care",
    description: "Vetted, trained specialist care professionals for dementia support, recovery care, and chronic condition management.",
    images: ["/logo.png"],
  },
};

export default function TalentSolutionsPage() {
  return <TalentSolutionsContent />;
}