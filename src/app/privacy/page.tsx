import { Metadata } from "next";
import PrivacyContent from "./PrivacyContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "Learn how World Impact Africa handles and protects your personal information and training data.",
    alternates: { canonical: `${base}/privacy` },
    openGraph: {
      title: "Privacy Policy | World Impact Africa",
      description: "Learn how World Impact Africa handles and protects your personal information and training data.",
      url: `${base}/privacy`,
      images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
    },
    twitter: {
      title: "Privacy Policy | World Impact Africa",
      description: "Learn how World Impact Africa protects your personal information and training data.",
      images: ["/wialogoicon.png"],
    },
    robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
    return <PrivacyContent />;
}
