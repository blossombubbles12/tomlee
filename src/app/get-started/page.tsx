import { Metadata } from "next";
import PageHero from "@/components/PageHero";
import GetStartedFlow from "@/components/GetStartedFlow";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Start your World Impact Africa journey — find the right solution for your organisation, individual career, or government programme.",
  alternates: { canonical: `${base}/get-started` },
  openGraph: {
    title: "Get Started | World Impact Africa",
    description: "Start your World Impact Africa journey — find the right solution for your organisation, individual career, or government programme.",
    url: `${base}/get-started`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Get Started | World Impact Africa",
    description: "Start your World Impact Africa journey — find the right solution for your organisation, individual career, or government programme.",
    images: ["/wialogoicon.png"],
  },
};

export default function GetStartedPage() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <PageHero
        title="Get Started"
        subtitle="Tell us who you are and we'll direct you to the right solution."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get Started" }]}
      />
      <GetStartedFlow />
    </div>
  );
}
