'use client';

import { api } from '@/lib/github/client';

export async function searchPullRequests({
  query,
  dir = 'desc',
  status,
  involves,
  review,
  userId,
}: {
  query: string;
  dir: string;
  status: 'open' | 'merged';
  involves: boolean;
  review: 'none' | 'approved' | 'changes_requested' | null;
  userId: string;
}) {
  try {
    const response = await fetch(`/api/users/${userId}/repos`);
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

      return validPrs;
    }
  } catch (error) {
    console.log({ error });
  }
}
