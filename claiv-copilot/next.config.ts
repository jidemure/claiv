import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
      {
        protocol: 'https',
        hostname: 'www.vectorlogo.zone',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
      },
    ],
  },
};

export default nextConfig;
