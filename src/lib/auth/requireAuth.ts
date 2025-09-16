import { getServerSession } from '@/lib/auth/getServerSession';

export async function requireAuth(): Promise<boolean> {
  const { isAuthenticated } = await getServerSession();
  return isAuthenticated;
}
