import 'server-only';

import { getUserId } from '@/lib/getUserId';
import { getAccessToken } from '@/lib/getAccessToken';

type Repo = {
  id: number;
  name: string;
  description: string;
  owner: {
    login: string;
  };
};

// TODO: Add pagination
export async function fetchGitHubRepos(): Promise<Repo[]> {
  const emptyResponse = Promise.resolve([] as Repo[]);
  const githubApiUrl = 'https://api.github.com';

  try {
    const userId = await getUserId();
    if (!userId) return emptyResponse;

    const accessToken = await getAccessToken(userId);
    if (!accessToken) return emptyResponse;

    const url = `${githubApiUrl}/user/repos`;
    console.log(`Fetching from GitHub: ${url}`);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github+json',
      },
    });

    if (!response.ok) {
      console.log('Failed to fetch\n', response.status, response.statusText);
      return emptyResponse;
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch repos:\n', error);
    return emptyResponse;
  }
}
