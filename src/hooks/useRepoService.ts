'use client';

import { useAuth } from './useAuth';

export function useRepoService() {
  const { user } = useAuth();

  async function createUserRepo(githubRepoId: string) {
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
    const { githubRepoId: success } = await request.json();
    if (!success) {
      throw new Error('Failed to track repo for user');
    }
  }

  async function fetchUserRepos(): Promise<GitHubRepo[]> {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const request = await fetch(`/api/users/${user.id}/repos`, {
      method: 'GET',
    });
    const repos = await request.json();

    if (!repos) {
      throw new Error('Failed to fetch tracked repos');
    }
    return repos;
  }

  async function deleteUserRepo(githubRepoId: string) {
    if (!user) {
      throw new Error('User not authenticated');
    }
    const request = await fetch(`/api/users/${user.id}/repos/${githubRepoId}`, {
      method: 'DELETE',
    });

    const { success } = await request.json();
    if (!success) {
      throw new Error('Failed to untrack repo for user');
    }
  }
  return {
    createUserRepo,
    fetchUserRepos,
    deleteUserRepo,
  };
}
