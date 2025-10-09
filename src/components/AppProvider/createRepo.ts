export async function createRepo({
  githubRepoId,
  userId,
}: {
  githubRepoId: string;
  userId: string;
}): Promise<GitHubRepo | null> {
  const response = await fetch(`/api/users/${userId}/repos`, {
    method: 'POST',
    body: JSON.stringify({ githubRepoId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  const createRepoResponse: GitHubRepo = await response.json();

  return createRepoResponse;
}
