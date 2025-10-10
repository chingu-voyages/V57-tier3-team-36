'use client';

import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';
import { useState } from 'react';

export function usePullRequestsSearch() {
  const { user, isAuthenticated } = useAuth();
  const [_pullRequests, setPullRequests] =
    useState<(GitHubPullRequest & { repo: string })[]>();

  async function searchPullRequests({
    query,
    dir = 'desc',
    status,
    involves,
    review,
  }: {
    query: string;
    dir: string;
    status: 'open' | 'merged';
    involves: boolean;
    review: 'none' | 'approved' | 'changes_requested' | null;
  }) {
    if (!isAuthenticated || !user) return;

    try {
      const response = await fetch(`/api/users/${user.id}/repos`);
      const repos = await response.json();
      if (repos.length === 0) return;

      const repoQuery = repos.map(
        (repo: GitHubRepo) => `${repo.owner.login}/${repo.name}`
      );

      const searchResult = await api.getPullRequestsBySearch(
        query,
        repoQuery,
        dir,
        status,
        involves,
        review
      );

      if (searchResult.success && searchResult.data.items) {
        const limit = 5;
        const limitedItems = searchResult.data.items.slice(0, limit);

        const prs = (await Promise.all(
          limitedItems.map(async item => {
            if (item.pull_request && item.pull_request.url) {
              const relativeUrl = item.pull_request.url.replace(
                'https://api.github.com',
                ''
              );
              const prResponse = await fetch(`/api/github${relativeUrl}`);
              const prJson = await prResponse.json();
              return prJson.data;
            }
            return null;
          })
        )) as (GitHubPullRequest & { repo: string })[];

        const validPrs = prs.filter(Boolean);
        setPullRequests(validPrs);
        return validPrs;
      }
    } catch (error) {
      console.log({ error });
    }
  }
  return { searchPullRequests };
}
