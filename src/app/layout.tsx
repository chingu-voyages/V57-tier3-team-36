import "./globals.css";
import { neon } from '@neondatabase/serverless'


async function getData() {
  const sql = neon(process.env.DEV_DATABASE_URL || '');
  const response = await sql`SELECT version()`;
  return response[0].version;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   const data = await getData()
   console.log('data:', data)
  return (
    <html lang="en">
      <body>
        <header>
          {data}
        </header>
        {children}
      </body>
    </html>
  );
}
