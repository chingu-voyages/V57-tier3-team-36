'use client'

import { handleClientRequest } from '@/lib/github/handleClientRequest';

export async function getAuthenticatedGitHubUser() {
  return handleClientRequest<GitHubUser>('/user');
}

export async function getUserRepos() {
  return handleClientRequest<GitHubRepo[]>('/user/repos');
}

export async function getAllReposForUsername(owner: string) {
  return handleClientRequest<GitHubRepo[]>(`/users/${owner}/repos`);
}

export async function getPullRequestsForRepo({
  owner,
  repo,
  state,
}: {
  owner: string;
  repo: string;
  state: 'open' | 'closed';
}) {
  return handleClientRequest<GitHubPullRequest[]>(
    `/repos/${owner}/${repo}/pulls?state=${state}`,
  );
}

export async function getContributorsForRepo({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  return handleClientRequest<GitHubContributor[]>(
    `/repos/${owner}/${repo}/contributors`,
  );
}

export async function getBranchesForRepo({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  return handleClientRequest<GitHubBranch[]>(
    `/repos/${owner}/${repo}/branches`,
  );
}
