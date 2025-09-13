import { auth, type AuthContext } from '@/lib/auth';
import { headers } from 'next/headers';

export async function getSession(): Promise<AuthContext> {
  const data = await auth.api.getSession({ headers: await headers() });

  const user = data?.user;
  const session = data?.session;

  return user && session
    ? { user, session, isAuthenticated: true }
    : { isAuthenticated: false };
}
