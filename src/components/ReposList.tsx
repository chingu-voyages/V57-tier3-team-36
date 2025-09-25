import { requireAuth } from '@/lib/auth/requireAuth';
import { createApi } from '@/lib/github/server';

export async function ReposList() {
  const isAuthenticated = await requireAuth();
  if (!isAuthenticated) return null;

  const api = await createApi();
  const user = await api.getAuthenticatedGitHubUser();
  const repos = await api.getUserRepos();
  const exampleRepos = await api.getReposExample();

  return (
    <div className="flex flex-col gap-4 w-full items-center text-gray-600">
      <p>Username: {user?.login}</p>
      <p>User Repos: {repos?.length}</p>
      <p>
        Example Repos: {exampleRepos?.data?.viewer?.repositories?.edges?.length}
      </p>
    </div>
  );
}
