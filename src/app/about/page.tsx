import { Metadata } from "next";
import AboutContent from "./AboutContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about World Impact Africa's mission, vision, and core values — Africa's leading workforce development and professional training organisation.",
  alternates: { canonical: `${base}/about` },
  openGraph: {
    title: "About Us | World Impact Africa",
    description: "Learn about World Impact Africa's mission, vision, and core values — Africa's leading workforce development and professional training organisation.",
    url: `${base}/about`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "About Us | World Impact Africa",
    description: "Learn about World Impact Africa's mission, vision, and core values.",
    images: ["/wialogoicon.png"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
