'use server';

import { getBearerAccessToken } from '@/lib/auth/getBearerAccessToken';
import { githubApiUrl } from '@/lib/github/constants';
import { fetchRequest } from '@/lib/request';

export async function handleServerRequest<T>(
  url: string,
  body?: Record<string, string>
): Promise<Result<T>> {
  const bearerToken = await getBearerAccessToken();

  if (!bearerToken) {
    throw new Error('Missing user access token');
  }

  const fiveMinutes = 300 as const;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    Authorization: bearerToken,
    'Cache-Control': `max-age=${fiveMinutes}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };

  const fetchOptions = !body
    ? { headers }
    : {
        body: JSON.stringify(body),
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        method: 'POST' as const,
      };

  const response = await fetchRequest(`${githubApiUrl}${url}`, fetchOptions);
  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.statusText}`);
  }
  const data = await response.json();

  return data;
}
