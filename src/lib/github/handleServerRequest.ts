'use server';

import { githubApiUrl as baseUrl } from '@/lib/github/constants';

export async function handleClientRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw new Error(
      `GitHub API request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data;
}
