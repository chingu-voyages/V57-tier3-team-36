import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,

  // prevent Next.js from resolving files outside the project root
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
