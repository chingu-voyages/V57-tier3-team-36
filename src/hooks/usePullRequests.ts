'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';

export function usePullRequests() {
  const { user, isAuthenticated } = useAuth();
  const [pullRequests, setPullRequests] =
    useState<(GitHubPullRequest & { repo: string; hasNextPage?: boolean })[]>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchPullRequests = async () => {
      try {
        const response = await fetch(`/api/users/${user.id}/repos`);
        const repos = await response.json();

        if (repos.length === 0) return;

        // Fetch all pull requests in parallel
        const promises = repos.map(async (repo: ResultSuccess<GitHubRepo>) => {
          const response = await api.getPullRequestsForRepo({
            owner: repo.data.owner.login,
            repo: repo.data.name,
            page,
          });

          return response.data.data.map(pullRequest => ({
            ...pullRequest,
            repo: repo.data.name,
            hasNextPage: response.hasNextPage,
          }));
        });

        const pullRequests = await Promise.all(promises);
        const combined = pullRequests.flat();
        setPullRequests(combined);
      } catch (error) {
        console.log({ error });
      }
    };

    setPullRequests(undefined);
    fetchPullRequests();
  }, [user, isAuthenticated, page]);

  return {
    pullRequests,
    page,
    setPage,
    hasNextPage: pullRequests?.some(i => i.hasNextPage),
    hasPreviousPage: page > 1,
  };
}
