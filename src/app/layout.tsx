import AddRepoModal from '@/components/AddRepoModal/AddRepoModal';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import SidebarToggle from '@/components/Sidebar/SidebarToggle';
import { lazy, Suspense } from 'react';
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

  return (
    <html lang="en" className="h-screen">
      <body className="drawer lg:drawer-open h-screen bg-base-300">
        <input
          id={sidebarCheckboxId}
          type="checkbox"
          className="drawer-toggle"
        />
        <Sidebar checkboxId={sidebarCheckboxId} />
        <div className="drawer-content h-screen overflow-y-auto">
          <SidebarToggle sidebarCheckboxId={sidebarCheckboxId} />
          <div className="h-screen flex flex-col">
            <Header />
            <main className="flex-grow px-4 pb-4">{children}</main>
          </div>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
        <AddRepoModal />
      </body>
    </html>
  );
}
