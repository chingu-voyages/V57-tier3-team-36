import { getAccessToken } from '@/lib/auth/getAccessToken';

export abstract class GitHubApiBaseClient {
  private baseUrl = 'https://api.github.com';

  protected async request<T>(path: string): Promise<Result<T, string>> {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return { status: 'error', error: 'Missing user access token' };
      }

      const response = await fetch(`${this.baseUrl}${path}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github+json',
        },
      });

      if (!response.ok) {
        return {
          status: 'error',
          error: `${response.status} ${response.statusText}`,
        };
      }

      const data = await response.json();
      return { status: 'success', data };
    } catch (error) {
      return {
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  protected async getData<T>(path: string): Promise<T | undefined> {
    const result = await this.request<T>(path);
    return result.status === 'success' ? result.data : undefined;
  }
}
