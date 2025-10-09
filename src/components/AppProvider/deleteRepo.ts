export async function deleteRepo({
  githubRepoId,
  userId,
}: {
  githubRepoId: string;
  userId: string;
}): Promise<boolean> {
  const response = await fetch(`/api/users/${userId}/repos/${githubRepoId}`, {
    method: 'DELETE',
  });

  return response.ok;
}
