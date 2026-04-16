/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/portifoliogustavo',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
