import Header from '@/components/Header/Header';
import LazyFooter from '@/components/Footer/LazyFooter';
import FloatingSidebarButton from '@/components/Sidebar/FloatingSidebarButton';
import Sidebar from '@/components/Sidebar/Sidebar';
import AppProvider from '@/components/AppProvider/AppProvider';

import './globals.css';

if (
  process.env.NODE_ENV === 'development' &&
  process.env.ENABLE_API_MOCKING === 'true'
) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('../mocks');
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarCheckboxId = 'sidebar-checkbox' as const;

  // Breakpoints must match to ensure users always have a way to access the sidebar
  // Large screens: persistent sidebar (no sidebar button)
  // Small screens: hidden sidebar + floating sidebar button
  const showSidebar = 'lg:drawer-open' as const;
  const hideFloatingButton = 'lg:hidden' as const;

  return (
    <html lang="en" className="h-screen">
      <body className={`drawer ${showSidebar} h-screen bg-base-300`}>
        <AppProvider>
          <input
            id={sidebarCheckboxId}
            type="checkbox"
            className="drawer-toggle"
          />
          <Sidebar checkboxId={sidebarCheckboxId} />
          <div className="drawer-content h-screen overflow-y-auto">
            <FloatingSidebarButton
              checkboxId={sidebarCheckboxId}
              buttonClass={hideFloatingButton}
            />

            <div className="h-screen flex flex-col">
              <Header />
              <main className="flex-grow px-4 pb-4">{children}</main>
            </div>

            <LazyFooter />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
