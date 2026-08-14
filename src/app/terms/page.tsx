import { Metadata } from "next";
import TermsContent from "./TermsContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read the terms and conditions for engaging with Tomlee Home Care's services.",
    alternates: { canonical: `${base}/terms` },
    openGraph: {
      title: "Terms of Service | Tomlee Home Care",
      description: "Read the terms and conditions for engaging with Tomlee Home Care's services.",
      url: `${base}/terms`,
      images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
    },
    twitter: {
      title: "Terms of Service | Tomlee Home Care",
      description: "Read the terms and conditions for engaging with Tomlee Home Care's services.",
      images: ["/logo.png"],
    },
    robots: { index: false, follow: true },
};

export default function TermsPage() {
    return <TermsContent />;
}