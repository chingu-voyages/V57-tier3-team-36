'use client';

import { githubApiPath } from '@/lib/github/constants';

export async function handleClientRequest<T>(path: string): Promise<T> {
  const baseUrl =
    `${process.env.NEXT_PUBLIC_BASE_URL}${githubApiPath}` as const;

  const response = await fetch(`${baseUrl}${path}`, { credentials: 'include' });
  if (!response.ok) {
    throw new Error(
      `GitHub API request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data;
}
