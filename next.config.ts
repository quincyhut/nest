import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: Removed "output: export" to enable server-side rendering for Sanity
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
