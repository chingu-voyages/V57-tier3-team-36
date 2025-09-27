import type { handleClientRequest } from '@/lib/github/handleClientRequest';
import type { handleServerRequest } from '@/lib/github/handleServerRequest';

export const apiHandlers = (
  requestHandler: typeof handleClientRequest | typeof handleServerRequest
) => ({
  getAuthenticatedGitHubUser: () => requestHandler<GitHubUser>('/user'),

  getUserRepos: () =>
    requestHandler<GitHubRepo[]>(
      '/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator'
    ),

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
      `/repos/${owner}/${repo}/pulls?state=${state}`
    ),

  getContributorsForRepo: ({ owner, repo }: { owner: string; repo: string }) =>
    requestHandler<GitHubContributor[]>(`/repos/${owner}/${repo}/contributors`),

  getBranchesForRepo: ({ owner, repo }: { owner: string; repo: string }) =>
    requestHandler<GitHubBranch[]>(`/repos/${owner}/${repo}/branches`),

  getReviewsForPullRequest: ({
    owner,
    repo,
    pull_number,
  }: {
    owner: string;
    repo: string;
    pull_number: number;
  }) =>
    requestHandler<GitHubPullRequestReview[]>(
      `/repos/${owner}/${repo}/pulls/${pull_number}/reviews`
    ),

  graphqlExample: (query: string) =>
    requestHandler<unknown>('/graphql', { query }),
});
