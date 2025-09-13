import { GitHubApiBaseClient } from '@/lib/github/GitHubApiBaseClient';

export class GitHubApiClient extends GitHubApiBaseClient {
  async getUser() {
    return this.getData<GitHubUser>('/user');
  }

  // TODO: Add pagination
  async getRepos() {
    return this.getData<GitHubRepo[]>('/user/repos');
  }

  async getReposForUser<T>(owner: string) {
    return this.getData<T>(`/users/${owner}/repos`);
  }

  async getPullRequestsForRepo<T>({
    owner,
    repo,
    params,
  }: {
    owner: string;
    repo: string;
    params?: { state: 'open' | 'closed' };
  }) {
    const optionalParams = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';
    return this.getData<T>(`/repos/${owner}/${repo}/pulls${optionalParams}`);
  }

  async getContributorsForRepo<T>({
    owner,
    repo,
  }: {
    owner: string;
    repo: string;
  }) {
    return this.getData<T>(`/repos/${owner}/${repo}/contributors`);
  }
}

export const githubApi = new GitHubApiClient();
