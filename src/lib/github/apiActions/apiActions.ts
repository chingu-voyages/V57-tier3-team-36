"use server";

import {
  BaseGithubApiActions,
  GitHubPaginatedResponse,
} from "@/lib/github/apiActions/baseApiActions";

type GitHubPaginatedActionParams = {
  owner: string;
  repo: string;
  pageNumber?: number;
};
const githubApiClient = BaseGithubApiActions();

export async function getAuthenticatedGitHubUser(): Promise<GitHubUser> {
  return githubApiClient.get<GitHubUser>("/user");
}

export async function getAllReposForUsername({
  owner,
  pageNumber = 1,
}: GitHubPaginatedActionParams): Promise<
  GitHubPaginatedResponse<GitHubRepo[]>
> {
  return githubApiClient.getWithPagination<GitHubRepo[]>(
    `/users/${owner}/repos`,
    pageNumber
  );
}

export async function getPullRequestsForRepo({
  owner,
  repo,
  pageNumber = 1,
  state,
}: GitHubPaginatedActionParams & { state: "open" | "closed" }): Promise<
  GitHubPaginatedResponse<GitHubPullRequest[]>
> {
  return githubApiClient.getWithPagination<GitHubPullRequest[]>(
    `/repos/${owner}/${repo}/pulls?state=${state}`,
    pageNumber
  );
}

export async function getContributorsForRepo({
  owner,
  repo,
  pageNumber = 1,
}: GitHubPaginatedActionParams): Promise<
  GitHubPaginatedResponse<GitHubContributor[]>
> {
  return githubApiClient.getWithPagination<GitHubContributor[]>(
    `/repos/${owner}/${repo}/contributors`,
    pageNumber
  );
}

export async function getBranchesForRepo({
  owner,
  repo,
  pageNumber = 1,
}: GitHubPaginatedActionParams): Promise<
  GitHubPaginatedResponse<GitHubBranch[]>
> {
  return githubApiClient.getWithPagination<GitHubBranch[]>(
    `/repos/${owner}/${repo}/branches`,
    pageNumber
  );
}
