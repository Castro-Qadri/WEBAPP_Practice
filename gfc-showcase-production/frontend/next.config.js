/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.gfcfans.com", "gfcfans.com", "cdn.shopify.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.gfcfans.com",
      },
      {
        protocol: "https",
        hostname: "**.shopify.com",
      },
    ],
  },
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

module.exports = config;
