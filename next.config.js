/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'ui-avatars.com', 'raw.githubusercontent.com'],
  },
};

module.exports = nextConfig;
