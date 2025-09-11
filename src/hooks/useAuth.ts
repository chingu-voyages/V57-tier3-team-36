'use client';

import { authClient } from '@/lib/authClient';
import type { User, Session } from '@/lib/auth';

export function useAuth(): {
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
} & (
  | { user: User; session: Session; isAuthenticated: true }
  | { user?: User; session?: Session; isAuthenticated: false }
) {
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const session = data?.session;

  const authData = {
    loading: isPending,
    signOut: () => {
      authClient.signOut();
      authClient.revokeSessions();
    },
    signIn: () =>
      authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
      }),
  };

  return user && session
    ? { ...authData, user, session, isAuthenticated: true }
    : { ...authData, isAuthenticated: false };
}
