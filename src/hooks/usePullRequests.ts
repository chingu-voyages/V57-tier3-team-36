'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';

export function usePullRequests() {
  const { user, isAuthenticated } = useAuth();
  const [pullRequests, setPullRequests] =
    useState<(GitHubPullRequest & { repo: string })[]>();

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const promises = fetch(`/api/users/${user.id}/repos`)
      .then(response => {
        return response.json();
      })
      .then(repos => {
        if (repos.length === 0) return;

        // Fetch all pull requests in parallel
        const promises = repos.map((repo: GitHubRepo) =>
          api
            .getPullRequestsForRepo({
              owner: repo.owner.login,
              repo: repo.name,
            })
            .then(response => {
              if (!response.success) return;
              return response.data.map(pullRequest => ({
                ...pullRequest,
                repo: repo.name,
              }));
            })
        );

        return Promise.all(promises);
      });

    promises
      .then(pullRequests => {
        if (!pullRequests) {
          console.warn('Missing response data');
          return;
        }
        const combined = pullRequests.flat();
        setPullRequests(combined);
      })
      .catch(error => {
        console.log({ error });
      });
  }, [user, isAuthenticated]);

  return pullRequests;
}
