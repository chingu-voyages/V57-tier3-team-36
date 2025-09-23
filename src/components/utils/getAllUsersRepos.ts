"use server";
import { createApi } from "@/lib/github/server";

export async function getAllUsersRepos(): Promise<GitHubRepo[]> {
  const api = await createApi();
  let userRepos: GitHubRepo[] = [];
  let page = 1;

  const repos = await api.getUserRepos();

  return repos as GitHubRepo[];

  // this code is for pagination
  while (true) {
    const reposPage = await api.getUserRepos(page);
    if (reposPage.length === 0) break;
    userRepos = [...userRepos, ...reposPage];
    page++;
  }
  return userRepos;
}
