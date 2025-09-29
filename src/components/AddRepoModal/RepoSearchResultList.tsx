import { RepoSearchResultCard } from '@/components/AddRepoModal/RepoSearchResultCard';

export function RepoSearchResultList({
  filteredResults,
}: {
  filteredResults: GitHubRepo[];
}) {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {filteredResults.map(repo => (
        <RepoSearchResultCard
          key={repo.id}
          id={repo.id}
          name={repo.name}
          description={repo.description}
        />
      ))}
    </div>
  );
}
