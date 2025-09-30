import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,

  env: {
    APP_VERSION:
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      process.env.npm_package_version || require('./package.json').version,
    APP_NAME: 'MyApp',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  // Prevent Next.js from resolving files outside the project root.
  outputFileTracingRoot: __dirname,

  // Only load MSW in development.
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/mockServiceWorker.js',
            destination: '/mockServiceWorker.js',
          },
        ]
      : [];
  },
};

export default nextConfig;
