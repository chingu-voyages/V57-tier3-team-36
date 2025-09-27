export const RepoService = {
  async trackRepoForUser(userId: string, githubRepoId: string) {
    const request = await fetch(`/api/users/${userId}/repos`, {
      method: 'POST',
      body: JSON.stringify({ githubRepoId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await request.json();
    if (!response.success) {
      throw new Error('Failed to track repo for user');
    }
  },
};
