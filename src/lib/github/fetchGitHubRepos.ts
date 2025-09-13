import { getAccessToken } from '@/lib/auth/getAccessToken';

// TODO: Add pagination
export async function fetchGitHubRepos(): Promise<
  Result<GitHubRepo[], string>
> {
  const githubApiUrl = 'https://api.github.com';

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return { data: undefined, error: 'Missing user access token' };
    }

    const url = `${githubApiUrl}/user/repos`;
    console.log(`Fetching from GitHub: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
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
