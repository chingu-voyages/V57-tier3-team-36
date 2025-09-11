import 'server-only';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

type Repo = {
  id: number;
  name: string;
  description: string;
};

// TODO: Add pagination
export async function fetchGitHubRepos(): Promise<Repo[]> {
  const emptyResponse = Promise.resolve([] as Repo[]);

  try {
    const githubApiUrl = process.env.GITHUB_API_URL;
    if (!githubApiUrl) {
      console.log('Missing GITHUB_API_URL');
      return emptyResponse;
    }

    const userId = (
      await auth.api.getSession({
        headers: await headers(),
      })
    )?.user.id;
    if (!userId) {
      console.log('Missing userId');
      return emptyResponse;
    }

    const { accessToken } = await auth.api.getAccessToken({
      body: {
        providerId: 'github',
        userId,
      },
    });
    if (!accessToken) {
      console.log('Missing accessToken');
      return emptyResponse;
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
      console.log('Failed to fetch\n', response.status, response.statusText);
      return emptyResponse;
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch repos:\n', error);
    return emptyResponse;
  }
}
