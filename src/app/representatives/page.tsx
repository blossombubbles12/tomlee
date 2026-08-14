import { Metadata } from "next";
import { pickImages } from "@/lib/images";
import RepresentativesContent from "./RepresentativesContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Care Professional Network",
  description: "Join the Tomlee Home Care Professional Network — trained and vetted care professionals trusted by families across Nigeria.",
  alternates: { canonical: `${base}/representatives` },
  openGraph: {
    title: "Care Professional Network | Tomlee Home Care",
    description: "Join the Tomlee Home Care Professional Network — trained and vetted care professionals trusted by families.",
    url: `${base}/representatives`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Care Professional Network | Tomlee Home Care",
    description: "Join the Tomlee Home Care Professional Network — trained and vetted care professionals.",
    images: ["/logo.png"],
  },
};

export default function RepresentativesPage() {
  const images = pickImages(10);
  return <RepresentativesContent images={images} />;
}