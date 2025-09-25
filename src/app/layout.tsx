import Footer from '@/components/Footer';
<<<<<<< HEAD
=======
import Sidebar from '@/components/Sidebar/Sidebar';
>>>>>>> b8bad62d8d914c05fbb60b3c537077a06ea70e98
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
  return (
    <html lang="en">
      <body>
<<<<<<< HEAD
\        {children}
        <Footer />
=======
        <div className="drawer lg:drawer-open">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <div className="w-full flex p-4 items-center gap-4">
              <label
                htmlFor="my-drawer"
                className="btn btn-primary drawer-button lg:hidden bg-white text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              </label>
              <h1>App Name</h1>
            </div>
            {children}
            <Footer />
          </div>
          <Sidebar />
        </div>
>>>>>>> b8bad62d8d914c05fbb60b3c537077a06ea70e98
      </body>
    </html>
  );
}
