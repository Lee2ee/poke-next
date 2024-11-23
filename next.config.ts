import type { NextConfig } from "next";

/**@type {import(`next`).NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/v1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
