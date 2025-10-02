'use client';

import { authClient } from '@/lib/auth/authClient';
import type { AuthContext } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useAuth(): {
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
} & AuthContext {
  const router = useRouter();
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  const session = data?.session;

  const [updating, setUpdating] = useState<boolean>(false);
  const loading = isPending || updating;

  const authData = {
    loading,
    signOut: async () => {
      setUpdating(true);
      await authClient.revokeSessions();
      await authClient.signOut();
      setUpdating(false);
      router.refresh();
    },
    signIn: async () => {
      setUpdating(true);
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
      });
      setUpdating(false);
    },
  };

  return user && session
    ? { ...authData, user, session, isAuthenticated: true }
    : { ...authData, isAuthenticated: false };
}
