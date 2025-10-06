'use client';

import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';
import { useEffect, useState } from 'react';

export function usePullRequests() {
  const { user, isAuthenticated } = useAuth();
  const [pullRequests, setPullRequests] =
    useState<(GitHubPullRequest & { repo: string; hasNextPage?: boolean })[]>();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchPullRequests = async () => {
      try {
        const repos = await fetch(`/api/users/${user.id}/repos`).then(
          response => {
            return response.json();
          }
        );

        if (repos.length === 0) return;

        // Fetch all pull requests in parallel
        const promises = repos.map(async (repo: GitHubRepo) => {
          const response = await api.getPullRequestsForRepo({
            owner: repo.owner.login,
            repo: repo.name,
          });

          if (!response.success) return [];

          return response.data.map(pullRequest => ({
            ...pullRequest,
            repo: repo.name,
          }));
        });

        const pullRequests = (await Promise.all(promises)).flat();
        setPullRequests(pullRequests);
      } catch (error) {
        console.error(
          'Failed to fetch pull requests:',
          error instanceof Error ? error.message : error
        );
      }
    };

    setPullRequests(undefined);
    fetchPullRequests();
  }, [user, isAuthenticated]);

  return pullRequests;
}
