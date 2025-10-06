'use client';

import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';
import { useEffect, useState } from 'react';

export function usePullRequests() {
  const { user, isAuthenticated } = useAuth();
  const [pullRequests, setPullRequests] =
    useState<(GitHubPullRequest & { repo: string })[]>();

  async function fetchPullRequests() {
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
        return combined;
      })
      .catch(error => {
        console.log({ error });
      });
  }

  async function searchPullRequests(query: string, dir: string = 'desc') {
    if (!isAuthenticated || !user) return;

    try {
      const response = await fetch(`/api/users/${user.id}/repos`);
      const repos = await response.json();
      if (repos.length === 0) return;
      console.log({ repos });
      const repoQuery = repos.map(
        (repo: GitHubRepo) => `${repo.owner.login}/${repo.name}`
      );
      console.log({ repoQuery });
      const searchResult = await api.getPullRequestsBySearch(
        query,
        repos.map((repo: GitHubRepo) => `${repo.owner.login}/${repo.name}`),
        dir
      );
      console.log({ searchResult });
      if (searchResult.success && searchResult.data.items.length > 0) {
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
              return await prResponse.json();
            }
            return null;
          })
        )) as (GitHubPullRequest & { repo: string })[];
        const validPrs = prs.filter(Boolean);
        console.log({ validPrs });
        setPullRequests(validPrs);
        return validPrs;
      }
    } catch (error) {
      console.log({ error });
    }
  }

  useEffect(() => {
    fetchPullRequests();
  }, [isAuthenticated, user]);

  return { fetchPullRequests, searchPullRequests, pullRequests };
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
