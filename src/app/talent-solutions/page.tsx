import { Metadata } from "next";
import TalentSolutionsContent from "./TalentSolutionsContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Talent & Workforce Solutions",
  description: "World Impact Africa helps organisations build sustainable talent pipelines through training, assessment, and certification services across Africa.",
  alternates: { canonical: `${base}/talent-solutions` },
  openGraph: {
    title: "Talent & Workforce Solutions | World Impact Africa",
    description: "Build sustainable talent pipelines through training, assessment, and certification services across Africa.",
    url: `${base}/talent-solutions`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Talent & Workforce Solutions | World Impact Africa",
    description: "Build sustainable talent pipelines through training, assessment, and certification services.",
    images: ["/wialogoicon.png"],
  },
};

export default function TalentSolutionsPage() {
  return <TalentSolutionsContent />;
}
