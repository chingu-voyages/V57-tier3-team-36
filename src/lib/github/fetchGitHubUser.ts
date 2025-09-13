import { getAccessToken } from '@/lib/auth/getAccessToken';

async function fetchGitHubUserResult(): Promise<Result<GitHubUser, string>> {
  const githubApiUrl = 'https://api.github.com';

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { status: 'error', error: 'Missing user access token' };
    }

    const response = await fetch(`${githubApiUrl}/user`, {
      headers: { Authorization: `Bearer ${accessToken}` },
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

export async function fetchGitHubUser() {
  const result = await fetchGitHubUserResult();
  return result.status === 'success' ? result.data : undefined;
}
