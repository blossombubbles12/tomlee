import { Metadata } from "next";
import DashboardContent from "./DashboardContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Representative Dashboard",
  description: "WorldImpact Representative Dashboard — manage students, consulting leads, and track commissions.",
  alternates: { canonical: `${base}/representatives/dashboard` },
  openGraph: {
    title: "Representative Dashboard | World Impact Africa",
    description: "WorldImpact Representative Dashboard — manage students, consulting leads, and track commissions.",
    url: `${base}/representatives/dashboard`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Representative Dashboard | World Impact Africa",
    description: "WorldImpact Representative Dashboard — manage students, consulting leads, and track commissions.",
    images: ["/wialogoicon.png"],
  },
};

export default function DashboardPage() {
  return <DashboardContent />;
}
