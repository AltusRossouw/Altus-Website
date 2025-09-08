/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove the assetPrefix and basePath for Docker deployment
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/Altus-Website' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/Altus-Website' : '',
}

module.exports = nextConfig
