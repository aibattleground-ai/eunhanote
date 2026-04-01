/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/eunhanote' : '',
  assetPrefix: isProd ? '/eunhanote/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
