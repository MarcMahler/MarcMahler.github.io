/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    // For GitHub Pages deployment
    basePath: '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
    trailingSlash: true,

    // Images configuration for static export
    images: {
        unoptimized: true,
    },
};