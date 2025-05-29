import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Without colon
        hostname: "localhost",
        port: "3000",
        pathname: "/**",  // Wildcard for all images
      }
    ]
  }
};

export default nextConfig;
