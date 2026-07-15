import { Metadata } from "next";
import { pickImages } from "@/lib/images";
import RepresentativesContent from "./RepresentativesContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Global Representative Network",
  description: "Join the WorldImpact Global Representative Network — earn commissions, build your professional network, and represent internationally focused institutions in your country.",
  alternates: { canonical: `${base}/representatives` },
  openGraph: {
    title: "Global Representative Network | World Impact Africa",
    description: "Join the WorldImpact Global Representative Network — earn commissions and represent international institutions in your country.",
    url: `${base}/representatives`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Global Representative Network | World Impact Africa",
    description: "Join the WorldImpact Global Representative Network — earn commissions and build your professional network.",
    images: ["/wialogoicon.png"],
  },
};

export default function RepresentativesPage() {
  const images = pickImages(10);
  return <RepresentativesContent images={images} />;
}
