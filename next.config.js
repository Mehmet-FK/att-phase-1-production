/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pro.attensam.at",
      },
      // {
      //   protocol: "https",
      //   hostname: "pbsolutions.dev",
      // },
    ],
  },
};

module.exports = nextConfig;
