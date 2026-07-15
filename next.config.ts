import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
};

export default nextConfig;
