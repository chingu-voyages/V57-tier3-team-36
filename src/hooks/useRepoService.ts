'use client';

import { useAuth } from './useAuth';

export function useRepoService() {
  const { user } = useAuth();

  const trackRepoForUser = async (githubRepoId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const request = await fetch(`/api/users/${user.id}/repos`, {
      method: 'POST',
      body: JSON.stringify({ githubRepoId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { success } = await request.json();
    if (!success) {
      throw new Error('Failed to track repo for user');
    }
  };

  return {
    trackRepoForUser,
  };
}
