import 'server-only';

import { getSession } from '@/lib/getSession';

export async function requireAuth(): Promise<boolean> {
  const { isAuthenticated } = await getSession();
  return isAuthenticated;
}
