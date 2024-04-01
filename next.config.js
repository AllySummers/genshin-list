/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'default',
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
    ],
  },
};

module.exports = nextConfig;
