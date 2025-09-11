import { BaseGithubApiClient } from "../base-github-api-client/base-github-api-client";

export class GithubRepoClient extends BaseGithubApiClient {
  async getAllReposForUsername<T>(owner: string): Promise<T> {
    return this.get<T>(`/users/${owner}/repos`);
  }
  async getOpenPullRequestsForRepo<T>(owner: string, repo: string): Promise<T> {
    return this.get<T>(`/repos/${owner}/${repo}/pulls?state=open`);
  }
  async getContributorsForRepo<T>(owner: string, repo: string): Promise<T> {
    return this.get<T>(`/repos/${owner}/${repo}/contributors`);
  }
  async getClosedPullRequestsForRepo<T>(
    owner: string,
    repo: string
  ): Promise<T> {
    return this.get<T>(`/repos/${owner}/${repo}/pulls?state=closed`);
  }
}
