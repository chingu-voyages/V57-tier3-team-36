import { requireAuth } from '@/lib/auth/requireAuth';
import { createApi } from '@/lib/github/server';

export async function ReposList() {
  const isAuthenticated = await requireAuth();
  if (!isAuthenticated) return null;

  const api = await createApi();
  const userResult = await api.getAuthenticatedGitHubUser();
  const reposResult = await api.getUserRepos();

  if (!userResult.success || !reposResult.success) {
    return <p>Error loading data</p>;
  }

  const user = userResult.data;
  const repos = reposResult.data;

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <p>Username: {user?.login}</p>
      <p>Repos: {repos?.length}</p>
      {repos?.map(repo => (
        <div key={repo.id} className="border p-4 rounded max-w-[600px] w-full">
          <h3 className="font-bold">{repo.name}</h3>
          <p className="text-gray-600">{repo.description}</p>
        </div>
      ))}
    </div>
  );
}
