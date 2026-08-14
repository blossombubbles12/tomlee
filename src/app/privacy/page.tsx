import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Learn how Tomlee Home Care handles and protects your personal information and care data.",
    alternates: { canonical: `${base}/privacy` },
    openGraph: {
      title: "Privacy Policy | Tomlee Home Care",
      description: "Learn how Tomlee Home Care handles and protects your personal information and care data.",
      url: `${base}/privacy`,
      images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
    },
    twitter: {
      title: "Privacy Policy | Tomlee Home Care",
      description: "Learn how Tomlee Home Care protects your personal information and care data.",
      images: ["/logo.png"],
    },
    robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
    return <PrivacyContent />;
}