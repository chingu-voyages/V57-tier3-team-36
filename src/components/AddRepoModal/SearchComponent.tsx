'use client';
import { RepoSearchResultList } from '@/components/AddRepoModal/RepoSearchResultList';
import { api } from '@/lib/github/client';
import { useEffect, useState } from 'react';
import { SearchField } from './SearchField';

export function SearchComponent({
  trackedRepoIds,
  setTrackedRepos,
  setCurrentRepo,
}: {
  trackedRepoIds: number[];
  setTrackedRepos: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
  setCurrentRepo: React.Dispatch<React.SetStateAction<GitHubRepo[]>>;
}) {
  const [fetchedRepos, setFetchedRepos] = useState<GitHubRepo[]>([]);
  const [filteredResults, setFilteredResults] = useState<GitHubRepo[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsBusy(true);
      const response = await api.getUserRepos();
      if (response.success && response.data) {
        setFetchedRepos(response.data);
        setFilteredResults(response.data);
      } else {
        console.error('Failed to fetch repositories');
      }
      setIsBusy(false);
    };

    fetchData();
  }, []);
  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = fetchedRepos.filter(
      repo =>
        repo.name.toLowerCase().includes(lowerCaseQuery) ||
        (repo.description &&
          repo.description.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredResults(results);
  };

  return (
    <div>
      <SearchField onSearchSubmit={handleSearch} isBusy={isBusy} />
      <RepoSearchResultList
        filteredResults={filteredResults}
        trackedRepoIds={trackedRepoIds}
        setTrackedRepos={setTrackedRepos}
        setCurrentRepo={setCurrentRepo}
      />
    </div>
  );
}
