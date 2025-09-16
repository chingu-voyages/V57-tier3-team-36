'use server';

import { BaseGithubApiActions } from '@/lib/github/baseApiActions';

type GitHubActionParams = {
  owner: string;
  repo: string;
};

const githubApiClient = BaseGithubApiActions();

export async function getAuthenticatedGitHubUser(): Promise<GitHubUser> {
  return githubApiClient.get<GitHubUser>('/user');
}

export async function getAllReposForUsername(
  owner: string
): Promise<GitHubRepo[]> {
  return githubApiClient.get<GitHubRepo[]>(`/users/${owner}/repos`);
}

export async function getPullRequestsForRepo({
  owner,
  repo,
  state,
}: GitHubActionParams & { state: 'open' | 'closed' }): Promise<
  GitHubPullRequest[]
> {
  return githubApiClient.get<GitHubPullRequest[]>(
    `/repos/${owner}/${repo}/pulls?state=${state}`
  );
}

export async function getContributorsForRepo({
  owner,
  repo,
}: GitHubActionParams): Promise<GitHubContributor[]> {
  return githubApiClient.get<GitHubContributor[]>(
    `/repos/${owner}/${repo}/contributors`
  );
}

export async function getBranchesForRepo({
  owner,
  repo,
}: GitHubActionParams): Promise<GitHubBranch[]> {
  return githubApiClient.get<GitHubBranch[]>(
    `/repos/${owner}/${repo}/branches`
  );
}
