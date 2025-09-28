'use client';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header';
import HamburgerIcon from '@/components/icons/HamburgerIcon';
import { lazy, Suspense, useRef } from 'react';
import './globals.css';

if (
  process.env.NODE_ENV === 'development' &&
  process.env.ENABLE_API_MOCKING === 'true'
) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../mocks');
}

const Footer = lazy(() => import('@/components/Footer'));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarCheckboxId = 'my-drawer' as const;
  const sidebarRef = useRef<HTMLInputElement>(null);

  return (
    <html lang="en" className="h-screen">
      <body className="drawer lg:drawer-open h-screen bg-base-300">
        <input
          id={sidebarCheckboxId}
          type="checkbox"
          className="drawer-toggle"
          ref={sidebarRef}
        />
        <Sidebar checkboxId={sidebarCheckboxId} />
        <div className="drawer-content h-screen overflow-y-auto">
          <div className="fab lg:hidden">
            <button
              className="btn btn-lg btn-circle btn-primary"
              onClick={() => sidebarRef.current?.click()}
            >
              <HamburgerIcon />
            </button>
          </div>
          <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow px-4 pb-4">{children}</main>
          </div>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
