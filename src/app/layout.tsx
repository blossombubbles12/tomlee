import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const baseUrl = "https://worldimpactafrica.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a365d",
};

export const metadata: Metadata = {
  title: {
    default: "World Impact Africa — Workforce Development & Professional Training in Africa",
    template: "%s | World Impact Africa",
  },
  description: "World Impact Africa delivers workforce development, professional certifications, corporate training, and talent solutions across Africa.",
  keywords: ["Workforce Development", "Corporate Training Nigeria", "Professional Certifications Africa", "Talent Solutions", "HR Development", "World Impact Africa", "Africa Training", "Employee Development Africa"],
  authors: [{ name: "World Impact Africa" }],
  creator: "World Impact Africa",
  publisher: "World Impact Africa",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: baseUrl,
    siteName: "World Impact Africa",
    title: "World Impact Africa — Workforce Development & Professional Training in Africa",
    description: "World Impact Africa delivers workforce development, professional certifications, corporate training, and talent solutions across Africa.",
    images: [{ url: "/wialogoicon.png", width: 512, height: 512, alt: "World Impact Africa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "World Impact Africa — Workforce Development & Professional Training in Africa",
    description: "Workforce development, professional certifications, and talent solutions across Africa.",
    images: ["/wialogoicon.png"],
  },
  icons: {
    icon: "/wialogoicon.png",
    apple: "/wialogoicon.png",
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
        className={`${poppins.variable} ${inter.variable} antialiased bg-background text-text overflow-x-hidden w-full`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "World Impact Africa",
              url: baseUrl,
              logo: `${baseUrl}/wialogoicon.png`,
              description: "World Impact Africa delivers workforce development, professional certifications, corporate training, and talent solutions across Africa.",
              email: "info@worldimpactafrica.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "NG",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@worldimpactafrica.com",
                contactType: "customer service",
                availableLanguage: ["English"],
              },
              sameAs: [
                "https://linkedin.com/company/worldimpactgroup",
                "https://twitter.com/worldimpactgroup",
                "https://facebook.com/worldimpactgroup",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "World Impact Africa",
              url: baseUrl,
              description: "World Impact Africa delivers workforce development, professional certifications, corporate training, and talent solutions across Africa.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${baseUrl}/search?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
