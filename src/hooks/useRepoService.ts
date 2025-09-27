'use client';

import { useAuth } from './useAuth';

export function useRepoService() {
  const { user } = useAuth();

  const trackRepoForUser = async (githubRepoId: string) => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`/api/users/${user.id}/repos`, {
      method: 'POST',
      body: JSON.stringify({ githubRepoId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to track repo');
    }
  };

  return {
    trackRepoForUser,
  };
}
