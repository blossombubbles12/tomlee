import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const baseUrl = "https://tomleehomecare.ng";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00264D",
};

export const metadata: Metadata = {
  title: {
    default: "Tomlee Home Care — Compassionate Home Health & Elderly Care Services",
    template: "%s | Tomlee Home Care",
  },
  description: "Tomlee Home Care delivers professional home health, elderly care, and personal support services with compassion — helping families care for loved ones in the comfort of home.",
  keywords: ["Home Care", "Elderly Care", "Home Health Care", "Caregivers", "Personal Support", "Dementia Care", "Respite Care", "Tomlee Home Care"],
  authors: [{ name: "Tomlee Home Care" }],
  creator: "Tomlee Home Care",
  publisher: "Tomlee Home Care",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: baseUrl,
    siteName: "Tomlee Home Care",
    title: "Tomlee Home Care — Compassionate Home Health & Elderly Care Services",
    description: "Professional home health and elderly care delivered with compassion, in the comfort of home.",
    images: [{ url: "/logo.png", width: 1280, height: 478, alt: "Tomlee Home Care" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomlee Home Care — Compassionate Home Health & Elderly Care Services",
    description: "Professional home health and elderly care delivered with compassion, in the comfort of home.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${plusJakarta.variable} ${manrope.variable} antialiased bg-background text-text overflow-x-hidden w-full`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Tomlee Home Care",
              url: baseUrl,
              logo: `${baseUrl}/logo.png`,
              description: "Tomlee Home Care delivers professional home health, elderly care, and personal support services with compassion.",
              email: "info@tomleehomecare.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "NG",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@tomleehomecare.com",
                contactType: "customer service",
                availableLanguage: ["English"],
              },
            }),
          }}
        />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}