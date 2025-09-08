/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Altus-Website' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/Altus-Website' : '',
}

module.exports = nextConfig
