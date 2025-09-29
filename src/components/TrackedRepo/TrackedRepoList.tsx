'use client';

export default function TrackedRepoList({
  onClick,
}: {
  onClick: (repoName: string) => void;
}) {
  // fetch repos from db
  const repos = [
    { id: 1, name: 'repo-1' },
    { id: 2, name: 'repo-2' },
    { id: 3, name: 'repo-3' },
  ];

  if (repos.length === 0) return <li>No repos tracked</li>;

  return (
    <>
      {repos.map(repo => (
        <li key={repo.id} onClick={() => onClick(repo.name)}>
          <a>{repo.name}</a>
        </li>
      ))}
    </>
  );
}
