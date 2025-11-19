import TypeGPUPlugin from 'unplugin-typegpu/webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    webpack: (config) => {
        config.plugins.push(TypeGPUPlugin());
        return config;
    },
    // Remove the assetPrefix and basePath for Docker deployment
    // assetPrefix: process.env.NODE_ENV === 'production' ? '/Altus-Website' : '',
    // basePath: process.env.NODE_ENV === 'production' ? '/Altus-Website' : '',
}

export default nextConfig;
