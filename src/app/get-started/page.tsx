import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GetStartedFlow from "@/components/GetStartedFlow";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Start your Tomlee Home Care journey — request care for a loved one, join our care professional network, or partner with us.",
  alternates: { canonical: `${base}/get-started` },
  openGraph: {
    title: "Get Started | Tomlee Home Care",
    description: "Start your Tomlee Home Care journey — request care for a loved one, join our care professional network, or partner with us.",
    url: `${base}/get-started`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Get Started | Tomlee Home Care",
    description: "Start your Tomlee Home Care journey — request care for a loved one, join our care professional network, or partner with us.",
    images: ["/logo.png"],
  },
};

export default function GetStartedPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Get Started"
        subtitle="Tell us who you are and we'll direct you to the right care solution."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Started" }]}
      />
      <GetStartedFlow />
    </div>
  );
}