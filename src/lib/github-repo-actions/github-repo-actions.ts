"use server";
import { BaseGithubApiClient } from "../base-github-api-client/base-github-api-client";

const githubApiClient = BaseGithubApiClient();

export async function getAllReposForUsername<T>(
  owner: string,
  pageNumber: number = 1
): Promise<{ data: T; nextPage?: number }> {
  return githubApiClient.getWithPagination<T>(
    `/users/${owner}/repos`,
    pageNumber
  );
}
export async function getOpenPullRequestsForRepo<T>(
  owner: string,
  repo: string
): Promise<T> {
  return githubApiClient.get<T>(`/repos/${owner}/${repo}/pulls?state=open`);
}
export async function getContributorsForRepo<T>(
  owner: string,
  repo: string
): Promise<T> {
  return githubApiClient.get<T>(`/repos/${owner}/${repo}/contributors`);
}
export async function getClosedPullRequestsForRepo<T>(
  owner: string,
  repo: string
): Promise<T> {
  return githubApiClient.get<T>(`/repos/${owner}/${repo}/pulls?state=closed`);
}
export async function getBranchesForRepo<T>(
  owner: string,
  repo: string
): Promise<{ data: T; nextPage?: number }> {
  return githubApiClient.getWithPagination<T>(
    `/repos/${owner}/${repo}/branches`
  );
}
