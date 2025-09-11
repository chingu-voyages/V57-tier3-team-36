import { fetchGitHubRepos } from '@/lib/fetchGithubRepos';
import { requireAuth } from '@/lib/requireAuth';

export async function ReposList() {
  const isAuthenticated = await requireAuth();
  if (!isAuthenticated) return null;

  const repos = await fetchGitHubRepos();

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      Repos: {repos.length}
      {repos.map((repo) => (
        <div key={repo.id} className="border p-4 rounded max-w-[600px] w-full">
          <h3 className="font-bold">{repo.name}</h3>
          <p className="text-gray-600">{repo.description}</p>
        </div>
      ))}
    </div>
  );
}
