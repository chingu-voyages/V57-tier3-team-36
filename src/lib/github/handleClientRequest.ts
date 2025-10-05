'use client';

import { githubApiPath } from '@/lib/github/constants';
import { fetchRequest } from '@/lib/request';

export async function handleClientRequest<T>(
  url: string,
  body?: Record<string, string>
): Promise<T> {
  const baseUrl =
    `${process.env.NEXT_PUBLIC_BASE_URL}${githubApiPath}` as const;

  const headers = { credentials: 'include' };

  const fetchOptions = !body
    ? { headers }
    : {
        body: JSON.stringify(body),
        headers: { ...headers, 'Content-Type': 'application/json' },
        method: 'POST' as const,
      };

  const response = await fetchRequest(`${baseUrl}${url}`, fetchOptions);

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}
