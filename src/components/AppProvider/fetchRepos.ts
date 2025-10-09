export async function fetchRepos({
  userId,
}: {
  userId: string;
}): Promise<GitHubRepo[]> {
  const reposResponse = await fetch(`/api/users/${userId}/repos`);
  const reposData: GitHubRepo[] = await reposResponse.json();
  return reposData;
}
