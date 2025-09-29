import { RepoSearchResultCard } from '@/components/AddRepoModal/RepoSearchResultCard';

export function RepoSearchResultList({
  filteredResults,
}: {
  filteredResults: GitHubRepo[];
}) {
  return (
    <div>
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
