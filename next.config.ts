import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/blog",        destination: "/insights", permanent: true },
      { source: "/blog/:slug*", destination: "/insights", permanent: true },
      { source: "/contact-us",  destination: "/contact",  permanent: true },
    ];
  },
  turbopack: false,
};

export default nextConfig;
