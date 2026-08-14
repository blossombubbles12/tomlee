import { Metadata } from "next";
import AboutContent from "./AboutContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Tomlee Home Care's mission, vision, and core values — a trusted provider of compassionate home care across Nigeria.",
  alternates: { canonical: `${base}/about` },
  openGraph: {
    title: "About Us | Tomlee Home Care",
    description: "Learn about Tomlee Home Care's mission, vision, and core values — a trusted provider of compassionate home care.",
    url: `${base}/about`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "About Us | Tomlee Home Care",
    description: "Learn about Tomlee Home Care's mission, vision, and core values.",
    images: ["/logo.png"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
