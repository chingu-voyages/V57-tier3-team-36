import type { components } from '@octokit/openapi-types';

declare global {
  type Result<T, E = Error> = { data: T } | { data: undefined; error: E };

  // GitHub username is the `login` property
  type GitHubUser = components['schemas']['simple-user'];

  type GitHubRepo = components['schemas']['repository'];
}

export {};
