import { Metadata } from "next";
import ApplyContent from "./ApplyContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Apply to Join the Care Professional Network",
  description: "Complete the application form to join the Tomlee Home Care Professional Network — trained care professionals trusted by families across Nigeria.",
  alternates: { canonical: `${base}/representatives/apply` },
  openGraph: {
    title: "Apply to Join the Care Professional Network | Tomlee Home Care",
    description: "Complete the application form to join the Tomlee Home Care Professional Network and start matching with families.",
    url: `${base}/representatives/apply`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Apply to Join the Care Professional Network | Tomlee Home Care",
    description: "Apply to join the Tomlee Home Care Professional Network.",
    images: ["/logo.png"],
  },
};

export default function ApplyPage() {
  return <ApplyContent />;
}