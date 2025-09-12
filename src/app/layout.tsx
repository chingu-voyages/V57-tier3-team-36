import 'server-only';

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
      <body>{children}</body>
    </html>
  );
}
