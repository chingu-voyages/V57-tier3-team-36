import { getServerSession } from '@/lib/auth/getServerSession';
import { Unauthorized } from '@/lib/response';
import { NextRequest } from 'next/server';
export async function middleware(_: NextRequest) {
  // Protect the route to ensure only authenticated users can access it
  const { isAuthenticated } = await getServerSession();
  if (!isAuthenticated) {
    return Unauthorized;
  }
  return;
}

export const config = {
  matcher: ['/api/users/:user_id/repos'],
};
