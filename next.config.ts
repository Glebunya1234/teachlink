import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //docker needs
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};
export default nextConfig;
