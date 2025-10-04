import type { components } from '@octokit/openapi-types';

declare global {
  type ResultSuccess<T> = { success: true; data: T; hasNextPage?: boolean };
  type NestedResultSuccess<T> = {
    success: true;
    data: { data: T };
    hasNextPage?: boolean;
  };
  type Result<T, E = string> = ResultSuccess<T> | { success: false; error: E };

  // GitHub username is the `login` property
  type GitHubUser = components['schemas']['simple-user'];

  type GitHubRepo = components['schemas']['repository'];

  type GitHubContributor = components['schemas']['contributor'];

  type GitHubBranch = components['schemas']['short-branch'];

  type GitHubPullRequest = components['schemas']['pull-request'];

  type GitHubPullRequestReview = components['schemas']['pull-request-review'];
}

export {};
