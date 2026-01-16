import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //docker needs
  output: 'standalone',

  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
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
