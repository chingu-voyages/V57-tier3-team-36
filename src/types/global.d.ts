import type { components } from "@octokit/openapi-types";

declare global {
  // GitHub username is the `login` property
  type GitHubUser = components["schemas"]["simple-user"];

  type GitHubRepo = components["schemas"]["repository"];

  type GitHubContributor = components["schemas"]["contributor"];

  type GitHubBranch = components["schemas"]["short-branch"];

  type GitHubPullRequest = components["schemas"]["pull-request"];
}

export {};
