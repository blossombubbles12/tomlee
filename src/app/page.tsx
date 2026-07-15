import { Metadata } from "next";
import { pickSliderImages } from "@/lib/images";
import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import IndustriesServed from "@/components/IndustriesServed";
import StatsCounter from "@/components/StatsCounter";
import PartnersAccreditations from "@/components/PartnersAccreditations";
import GovernmentPartnerships from "@/components/GovernmentPartnerships";
import WhyWorldImpact from "@/components/WhyWorldImpact";
import Testimonials from "@/components/Testimonials";
import HomeClosingCTA from "@/components/HomeClosingCTA";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: { absolute: "World Impact Africa — Workforce Development & Professional Training in Africa" },
  description: "World Impact Africa delivers workforce development, professional certifications, corporate training, and talent solutions across Africa.",
  alternates: { canonical: base },
  openGraph: {
    title: "World Impact Africa — Workforce Development & Professional Training in Africa",
    description: "World Impact Africa delivers workforce development, professional certifications, corporate training, and talent solutions across Africa.",
    url: base,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "World Impact Africa — Workforce Development & Professional Training in Africa",
    description: "World Impact Africa delivers workforce development, professional certifications, corporate training, and talent solutions across Africa.",
    images: ["/wialogoicon.png"],
  },
};

export default function Home() {
  const heroImages = pickSliderImages(4);
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero images={heroImages} />
      <WhoWeAre />
      <WhatWeDo />
      <IndustriesServed />
      <StatsCounter />
      <PartnersAccreditations />
      <GovernmentPartnerships />
      <WhyWorldImpact />
      <Testimonials />
      <HomeClosingCTA />
    </div>
  );
}
