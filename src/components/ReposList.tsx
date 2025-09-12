import 'server-only';

import { fetchUser } from '@/lib/fetchUser';
import { fetchGitHubRepos } from '@/lib/fetchGithubRepos';
import { listPullRequests } from '@/lib/listPullRequests';
import { requireAuth } from '@/lib/requireAuth';

export async function ReposList() {
  const isAuthenticated = await requireAuth();
  if (!isAuthenticated) return null;

  const user = await fetchUser();
  const repos = await fetchGitHubRepos();
  const pulls =
    repos.length > 0 && user.login
      ? await listPullRequests({ repo: repos[0].name, owner: user.login })
      : [];

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <p>Username: {user?.login}</p>
      <p>Repos: {repos?.length}</p>
      {repos?.map((repo) => (
        <div key={repo.id} className="border p-4 rounded max-w-[600px] w-full">
          <h3 className="font-bold">{repo.name}</h3>
          <p className="text-gray-600">{repo.description}</p>
        </div>
      ))}

      <p>PRs: {pulls?.length}</p>
      {pulls?.map((pr) => (
        <div key={pr.id} className="border p-4 rounded max-w-[600px] w-full">
          <h3 className="font-bold">{pr.title}</h3>
          <p className="text-gray-600">{pr.url}</p>
        </div>
      ))}
    </div>
  );
}
