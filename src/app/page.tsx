import { Metadata } from "next";
import { pickSliderImages } from "@/lib/images";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import ServiceCards from "@/components/ServiceCards";
import IndustriesServed from "@/components/IndustriesServed";
import IndustriesCards from "@/components/IndustriesCards";
import StatsCounter from "@/components/StatsCounter";
import PartnersAccreditations from "@/components/PartnersAccreditations";
import GovernmentPartnerships from "@/components/GovernmentPartnerships";
import WhyWorldImpact from "@/components/WhyWorldImpact";
import WhyCards from "@/components/WhyCards";
import Testimonials from "@/components/Testimonials";
import HomeClosingCTA from "@/components/HomeClosingCTA";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: { absolute: "Tomlee Home Care — Compassionate Home Health & Elderly Care Services" },
  description: "Tomlee Home Care delivers professional home health, elderly care, and personal support services with compassion — helping families care for loved ones in the comfort of home.",
  alternates: { canonical: base },
  openGraph: {
    title: "Tomlee Home Care — Compassionate Home Health & Elderly Care Services",
    description: "Professional home health and elderly care delivered with compassion, in the comfort of home.",
    url: base,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Tomlee Home Care — Compassionate Home Health & Elderly Care Services",
    description: "Professional home health and elderly care delivered with compassion, in the comfort of home.",
    images: ["/logo.png"],
  },
};

export default function Home() {
  const heroImages = pickSliderImages(4);
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero images={heroImages} />
      <WhoWeAre />
      <WhatWeDo />
      <ServiceCards />
      <IndustriesServed />
      <IndustriesCards />
      <WhyWorldImpact />
      <WhyCards />
      <StatsCounter />
      <PartnersAccreditations />
      <GovernmentPartnerships />
      <Testimonials />
      <HomeClosingCTA />
    </div>
  );
}