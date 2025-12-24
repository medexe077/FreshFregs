import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove or comment out outputFileTracingRoot if not needed
  // outputFileTracingRoot: path.resolve(__dirname, "../../"),
  experimental: {
    // Remove any invalid experimental options
  },
};

export default nextConfig;