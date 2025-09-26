import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar/Sidebar';
import HamburgerIcon from '@/components/icons/HamburgerIcon';
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
  const sidebarCheckboxId = 'my-drawer' as const;

  return (
    <html lang="en" className="min-h-screen">
      <body className="drawer lg:drawer-open min-h-screen">
        <input
          id={sidebarCheckboxId}
          type="checkbox"
          className="drawer-toggle"
        />
        <Sidebar checkboxId={sidebarCheckboxId} />
        <div className="drawer-content min-h-screen">
          <div className="min-h-screen flex flex-col">
            <header className="w-full flex p-4 items-center gap-4 h-[64px] bg-base-200">
              <label
                htmlFor={sidebarCheckboxId}
                className="btn btn-primary drawer-button lg:hidden"
              >
                <HamburgerIcon />
              </label>
              <h1>App Name</h1>
            </header>
            <main className="bg-base-100 flex-grow min-h-screen overflow-y-auto">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
