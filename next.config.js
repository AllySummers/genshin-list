/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/genshin/image/upload/sprites/**",
      },
      {
        protocol: "https",
        hostname: "api.ambr.top",
        pathname: "/assets/UI/**",
      },
      {
        protocol: "https",
        hostname: "gi.yatta.top",
        pathname: "/assets/**"
      }
    ],
  },
};

module.exports = nextConfig;
