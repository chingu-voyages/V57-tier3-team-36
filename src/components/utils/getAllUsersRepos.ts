"use server";
import { GraphQLApiHandlers } from "@/lib/github/graphQLApiHandlers";
import { createApi } from "@/lib/github/server";

export async function getAllUsersRepos(): Promise<GitHubRepo[]> {
  const api: ReturnType<typeof GraphQLApiHandlers> = (await createApi(
    true
  )) as ReturnType<typeof GraphQLApiHandlers>;
  // let userRepos: GitHubRepo[] = [];
  // let page = 1;

  const repos = await api.getUserWritableRepos();
  console.log(JSON.stringify(repos, null, 2));
  return repos.viewer.repositories.edges.map((edge) => edge.node);
  // return repos as GitHubRepo[];

  // // this code is for pagination
  // while (true) {
  //   const reposPage = await api.getUserRepos(page);
  //   if (reposPage.length === 0) break;
  //   userRepos = [...userRepos, ...reposPage];
  //   page++;
  // }
  //return userRepos;
}
