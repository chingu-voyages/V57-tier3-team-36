'use client';

import { authClient } from '@/lib/auth/authClient';
import type { AuthContext } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export function useAuth(): {
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
} & AuthContext {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const session = data?.session;

  const authData = {
    loading: isPending,
    signOut: async () => {
      await authClient.revokeSessions();
      await authClient.signOut();
      router.refresh();
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
