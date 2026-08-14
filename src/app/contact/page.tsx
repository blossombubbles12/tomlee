import { Metadata } from "next";
import ContactContent from "./ContactContent";

const base = "https://tomleehomecare.ng";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Tomlee Home Care to request care, ask about our services, or enquiries about joining our care professional network.",
  alternates: { canonical: `${base}/contact` },
  openGraph: {
    title: "Contact Us | Tomlee Home Care",
    description: "Get in touch with Tomlee Home Care to request care, ask about our services, or join our care professional network.",
    url: `${base}/contact`,
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    title: "Contact Us | Tomlee Home Care",
    description: "Get in touch with Tomlee Home Care for all enquiries.",
    images: ["/logo.png"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}