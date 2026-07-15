import { Metadata } from "next";
import ApplyContent from "./ApplyContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Apply to Become a Representative",
  description: "Complete the application form to become a WorldImpact Global Representative and start earning commissions representing international institutions in your country.",
  alternates: { canonical: `${base}/representatives/apply` },
  openGraph: {
    title: "Apply to Become a Representative | World Impact Africa",
    description: "Complete the application form to become a WorldImpact Global Representative and start earning commissions.",
    url: `${base}/representatives/apply`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Apply to Become a Representative | World Impact Africa",
    description: "Apply to become a WorldImpact Global Representative and start earning commissions.",
    images: ["/wialogoicon.png"],
  },
};

export default function ApplyPage() {
  return <ApplyContent />;
}
