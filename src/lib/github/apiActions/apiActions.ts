"use server";

import {
  BaseGithubApiActions,
  GitHubPaginatedResponse,
} from "./baseApiActions";

const githubApiClient = BaseGithubApiActions();

export async function getAuthenticatedGitHubUser(): Promise<GitHubUser> {
  return githubApiClient.get<GitHubUser>("/user");
}

export async function getAllReposForUsername(
  owner: string,
  pageNumber: number = 1
): Promise<GitHubPaginatedResponse<GitHubRepo[]>> {
  return githubApiClient.getWithPagination<GitHubRepo[]>(
    `/users/${owner}/repos`,
    pageNumber
  );
}
export async function getOpenPullRequestsForRepo(
  owner: string,
  repo: string,
  pageNumber: number = 1
): Promise<GitHubPaginatedResponse<GitHubPullRequest[]>> {
  return githubApiClient.getWithPagination<GitHubPullRequest[]>(
    `/repos/${owner}/${repo}/pulls?state=open`,
    pageNumber
  );
}
export async function getContributorsForRepo(
  owner: string,
  repo: string,
  pageNumber: number = 1
): Promise<GitHubPaginatedResponse<GitHubContributor[]>> {
  return githubApiClient.getWithPagination<GitHubContributor[]>(
    `/repos/${owner}/${repo}/contributors`,
    pageNumber
  );
}
export async function getClosedPullRequestsForRepo(
  owner: string,
  repo: string,
  pageNumber: number = 1
): Promise<GitHubPaginatedResponse<GitHubPullRequest[]>> {
  return githubApiClient.getWithPagination<GitHubPullRequest[]>(
    `/repos/${owner}/${repo}/pulls?state=closed`,
    pageNumber
  );
}
export async function getBranchesForRepo(
  owner: string,
  repo: string,
  pageNumber: number = 1
): Promise<GitHubPaginatedResponse<GitHubBranch[]>> {
  return githubApiClient.getWithPagination<GitHubBranch[]>(
    `/repos/${owner}/${repo}/branches`,
    pageNumber
  );
}
