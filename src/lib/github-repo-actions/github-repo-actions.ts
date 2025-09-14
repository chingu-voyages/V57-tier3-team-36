"use server";
import { BaseGithubApiClient } from "../base-github-api-client/base-github-api-client";

const githubApiClient = BaseGithubApiClient();

export async function getAllReposForUsername(
  owner: string,
  pageNumber: number = 1
): Promise<{ data: GitHubRepo[]; nextPage?: number }> {
  return githubApiClient.getWithPagination<GitHubRepo[]>(
    `/users/${owner}/repos`,
    pageNumber
  );
}
export async function getOpenPullRequestsForRepo(
  owner: string,
  repo: string
): Promise<GitHubPullRequest[]> {
  return githubApiClient.get<GitHubPullRequest[]>(
    `/repos/${owner}/${repo}/pulls?state=open`
  );
}
export async function getContributorsForRepo(
  owner: string,
  repo: string
): Promise<GitHubContributor[]> {
  return githubApiClient.get<GitHubContributor[]>(
    `/repos/${owner}/${repo}/contributors`
  );
}
export async function getClosedPullRequestsForRepo(
  owner: string,
  repo: string
): Promise<GitHubPullRequest[]> {
  return githubApiClient.get<GitHubPullRequest[]>(
    `/repos/${owner}/${repo}/pulls?state=closed`
  );
}
export async function getBranchesForRepo(
  owner: string,
  repo: string
): Promise<{ data: GitHubBranch[]; nextPage?: number }> {
  return githubApiClient.getWithPagination<GitHubBranch[]>(
    `/repos/${owner}/${repo}/branches`
  );
}
