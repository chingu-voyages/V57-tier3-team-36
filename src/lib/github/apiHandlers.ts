import type { handleServerRequest } from '@/lib/github/handleServerRequest';
import type { handleClientRequest } from '@/lib/github/handleClientRequest';

export const apiHandlers = (
  requestHandler: typeof handleClientRequest | typeof handleServerRequest,
) => ({
  getAuthenticatedGitHubUser: () => requestHandler<GitHubUser>('/user'),

  getUserRepos: () => requestHandler<GitHubRepo[]>('/user/repos'),

  getAllReposForUsername: (owner: string) =>
    requestHandler<GitHubRepo[]>(`/users/${owner}/repos`),

  getPullRequestsForRepo: ({
    owner,
    repo,
    state,
  }: {
    owner: string;
    repo: string;
    state: 'open' | 'closed';
  }) =>
    requestHandler<GitHubPullRequest[]>(
      `/repos/${owner}/${repo}/pulls?state=${state}`,
    ),

  getContributorsForRepo: ({ owner, repo }: { owner: string; repo: string }) =>
    requestHandler<GitHubContributor[]>(`/repos/${owner}/${repo}/contributors`),

  getBranchesForRepo: ({ owner, repo }: { owner: string; repo: string }) =>
    requestHandler<GitHubBranch[]>(`/repos/${owner}/${repo}/branches`),
});
