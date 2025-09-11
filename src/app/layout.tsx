import 'server-only';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/app/globals.css';

if (
  process.env.NODE_ENV === 'development' &&
  process.env.ENABLE_API_MOCKING === 'true'
) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../mocks');
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'App Name Goes Here',
  description: 'App description goes here',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
