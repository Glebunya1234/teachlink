import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    remotePatterns: [
       {
        protocol: 'http',
        hostname: 'localhost',
        port: '5204',
        pathname: '/api/images/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tutors',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
