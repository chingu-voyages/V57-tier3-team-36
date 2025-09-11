import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,

  // prevent Next.js from resolving files outside the project root
  outputFileTracingRoot: './',
};

export default nextConfig;
