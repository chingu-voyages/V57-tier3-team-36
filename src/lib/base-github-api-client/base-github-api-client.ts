export abstract class BaseGithubApiClient {
  private baseUrl: string = "https://api.github.com";

  protected async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.statusText}`);
    }
    return response.json();
  }
}
