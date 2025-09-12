import { getAccessToken } from '@/lib/auth/getAccessToken';
import { getUserId } from '@/lib/auth/getUserId';
import type { components } from '@octokit/openapi-types';

// GitHub username is the `login` property
export type GitHubUser = components['schemas']['simple-user'];

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const emptyResponse = Promise.resolve({} as GitHubUser);
  const githubApiUrl = 'https://api.github.com';

  try {
    const userId = await getUserId();
    if (!userId) return emptyResponse;

    const accessToken = await getAccessToken(userId);
    if (!accessToken) return emptyResponse;

    const url = `${githubApiUrl}/user`;
    console.log(`Fetching from GitHub: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.log('Failed to fetch\n', response.status, response.statusText);
      return emptyResponse;
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch user:\n', error);
    return emptyResponse;
  }
}
