import { requireAuth } from "@/lib/auth/requireAuth";
import { fetchGitHubRepos } from "@/lib/github-repo-actions/fetchGitHubRepos";
import { getAuthenticatedGitHubUser } from "@/lib/github-repo-actions/github-repo-actions";

export async function ReposList() {
  const isAuthenticated = await requireAuth();
  if (!isAuthenticated) return null;

  const user = await getAuthenticatedGitHubUser();
  const repos = await fetchGitHubRepos();

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <p>Username: {user?.login}</p>
      <p>Repos: {repos?.length}</p>
      {repos?.map((repo) => (
        <div key={repo.id} className="border p-4 rounded max-w-[600px] w-full">
          <h3 className="font-bold">{repo.name}</h3>
          <p className="text-gray-600">{repo.description}</p>
        </div>
      ))}
    </div>
  );
}
