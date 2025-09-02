import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    allowedDevOrigins: ['http://192.168.1.14:3000'],
  },
};

export default nextConfig;