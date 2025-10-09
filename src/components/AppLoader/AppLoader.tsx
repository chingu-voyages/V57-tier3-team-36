import LandingPage from '@/components/LandingPage/LandingPage';
import { getServerSession } from '@/lib/auth/getServerSession';

export default async function AppLoader({
  children,
  sidebarClass,
}: {
  children: React.ReactNode;
  sidebarClass: string;
}) {
  const { isAuthenticated } = await getServerSession();

  return (
    <body
      className={`${isAuthenticated ? sidebarClass : ''} h-screen bg-base-300`}
    >
      {isAuthenticated ? children : <LandingPage />}
    </body>
  );
}
