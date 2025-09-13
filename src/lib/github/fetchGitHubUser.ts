import { getAccessToken } from '@/lib/auth/getAccessToken';

export async function fetchGitHubUser(): Promise<Result<GitHubUser, string>> {
  const githubApiUrl = 'https://api.github.com';

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { data: undefined, error: 'Missing user access token' };
    }

    const response = await fetch(`${githubApiUrl}/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      return {
        data: undefined,
        error: `${response.status} ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      data: undefined,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
