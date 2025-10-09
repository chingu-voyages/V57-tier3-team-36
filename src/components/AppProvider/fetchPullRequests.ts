import { githubApiPath } from '@/lib/github/constants';

// (!) Limited to the first page of up to 100 results
export async function fetchPullRequests({
  repoOwner,
  repoName,
}: {
  repoOwner: string;
  repoName: string;
}): Promise<GitHubPullRequest[]> {
  const baseUrl =
    `${process.env.NEXT_PUBLIC_BASE_URL}${githubApiPath}` as const;
  const url = `/repos/${repoOwner}/${repoName}/pulls?state=open&per_page=100`;

  const response = await fetch(`${baseUrl}${url}`, {
    headers: { credentials: 'include' },
  });

  if (!response.ok) {
    console.error(
      `GitHub API request failed: ${response.status} ${response.statusText}`
    );
    return [];
  }

  const pullRequestsResponse: {
    success: boolean;
    data: GitHubPullRequest[];
  } = await response.json();

  return pullRequestsResponse.data;
}
