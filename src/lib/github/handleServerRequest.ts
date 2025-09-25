'use server';

import { getBearerAccessToken } from '@/lib/auth/getBearerAccessToken';
import { githubApiUrl } from '@/lib/github/constants';

export async function handleServerRequest<T>(
  url: string,
  body?: Record<string, string>
): Promise<T> {
  const bearerToken = await getBearerAccessToken();

  if (!bearerToken) {
    throw new Error('Missing user access token');
  }

  const fetchOptions: RequestInit = !body
    ? {}
    : {
        body: JSON.stringify(body),
        method: 'POST',
      };

  const response = await fetch(`${githubApiUrl}${url}`, {
    ...fetchOptions,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: bearerToken,
    },
  });
  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
