import { RepoSearchResultCard } from '@/components/AddRepoModal/RepoSearchResultCard';

export function RepoSearchResultList({
  filteredResults,
  trackedRepoIds,
  setTrackedRepos,
  setCurrentRepo,
}: {
  filteredResults: GitHubRepo[];
  trackedRepoIds: number[];
  setTrackedRepos: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
  setCurrentRepo: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
}) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {filteredResults.map(repo => (
        <RepoSearchResultCard
          key={repo.id}
          id={repo.id}
          name={repo.name}
          description={repo.description}
          trackedRepoIds={trackedRepoIds}
          tracked={trackedRepoIds.includes(repo.id)}
          setTrackedRepos={setTrackedRepos}
          setCurrentRepo={setCurrentRepo}
        />
      ))}
    </div>
  );
}
