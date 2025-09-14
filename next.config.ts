import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  // Prevent Next.js from resolving files outside the project root.
  outputFileTracingRoot: __dirname,

  // Only load MSW in development.
  async rewrites() {
    return process.env.NODE_ENV === "development"
      ? [
          {
            source: "/mockServiceWorker.js",
            destination: "/mockServiceWorker.js",
          },
        ]
      : [];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/in/**",
      },
    ],
  },
};

export default nextConfig;
