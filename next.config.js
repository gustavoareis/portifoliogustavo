/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/portifoliogustavo',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
