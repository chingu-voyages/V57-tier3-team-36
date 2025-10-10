import { githubApiPath } from '@/lib/github/constants';

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const baseUrl =
    `${process.env.NEXT_PUBLIC_BASE_URL}${githubApiPath}` as const;

  const reposResponse = await fetch(
    `${baseUrl}/user/repos?per_page=10&sort=updated`
  );
  const reposData: {
    success: boolean;
    data: GitHubRepo[];
  } = await reposResponse.json();

  return reposData.data;
}
