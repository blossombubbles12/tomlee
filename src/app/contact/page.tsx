import { Metadata } from "next";
import ContactContent from "./ContactContent";

const base = "https://worldimpactafrica.com";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with World Impact Africa for corporate training, professional certifications, talent solutions, or general enquiries.",
  alternates: { canonical: `${base}/contact` },
  openGraph: {
    title: "Contact Us | World Impact Africa",
    description: "Get in touch with World Impact Africa for corporate training, professional certifications, talent solutions, or general enquiries.",
    url: `${base}/contact`,
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    title: "Contact Us | World Impact Africa",
    description: "Get in touch with World Impact Africa for all enquiries.",
    images: ["/wialogoicon.png"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
