import { Metadata } from "next";
import TermsContent from "./TermsContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
    title: "Terms of Service",
    description: "Read the terms and conditions for engaging with World Impact Africa's training and professional development services.",
    alternates: { canonical: `${base}/terms` },
    openGraph: {
      title: "Terms of Service | World Impact Africa",
      description: "Read the terms and conditions for engaging with World Impact Africa's services.",
      url: `${base}/terms`,
      images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
    },
    twitter: {
      title: "Terms of Service | World Impact Africa",
      description: "Read the terms and conditions for engaging with World Impact Africa's services.",
      images: ["/wialogoicon.png"],
    },
    robots: { index: false, follow: true },
};

export default function TermsPage() {
    return <TermsContent />;
}
