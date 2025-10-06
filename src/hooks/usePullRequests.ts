'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';
import { useRepoService } from '@/hooks/useRepoService';

export function usePullRequests() {
  const { user, isAuthenticated } = useAuth();
  const [pullRequests, setPullRequests] =
    useState<(GitHubPullRequest & { repo: string; hasNextPage?: boolean })[]>();
  const { fetchUserRepos } = useRepoService();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchPullRequests = async () => {
      try {
        const repos = await fetchUserRepos();

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
  }, [user, isAuthenticated, fetchUserRepos]);

  return pullRequests;
}
