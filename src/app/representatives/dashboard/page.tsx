import { Metadata } from "next";
import DashboardContent from "./DashboardContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Care Professional Dashboard",
  description: "Tomlee Home Care Care Professional Dashboard — manage care referrals, client leads, and track commissions.",
  alternates: { canonical: `${base}/representatives/dashboard` },
  openGraph: {
    title: "Care Professional Dashboard | Tomlee Home Care",
    description: "Tomlee Home Care Care Professional Dashboard — manage referrals, client leads, and track commissions.",
    url: `${base}/representatives/dashboard`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Care Professional Dashboard | Tomlee Home Care",
    description: "Tomlee Home Care Care Professional Dashboard — manage referrals, client leads, and track commissions.",
    images: ["/logo.png"],
  },
};

export default function DashboardPage() {
  return <DashboardContent />;
}