import { requireAuth } from '@/lib/auth/requireAuth';

export default async function TrackedRepoList() {
  const isAuthenticated = await requireAuth();
  if (!isAuthenticated) return null;

  // fetch repos from db
  const repos = [
    { id: 1, name: 'repo-1' },
    { id: 2, name: 'repo-2' },
    { id: 3, name: 'repo-3' },
  ];

  if (repos.length === 0) return <li>No repos tracked</li>;

  return (
    <>
      {repos.map(repo => {
        <li>
          <a>{repo.name}</a>
        </li>;
      })}
    </>
  );
}
