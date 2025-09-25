'use client';

import { githubApiPath } from '@/lib/github/constants';

export async function handleClientRequest<T>(
  url: string,
  body?: Record<string, string>
): Promise<T> {
  const baseUrl =
    `${process.env.NEXT_PUBLIC_BASE_URL}${githubApiPath}` as const;

  const fetchOptions: RequestInit = !body
    ? {}
    : {
        body: JSON.stringify(body),
        method: 'POST',
      };

  const response = await fetch(`${baseUrl}${url}`, {
    ...fetchOptions,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data;
}
