import { getSession } from '@/lib/auth/getSession';

export async function requireAuth(): Promise<boolean> {
  const { isAuthenticated } = await getSession();
  return isAuthenticated;
}
