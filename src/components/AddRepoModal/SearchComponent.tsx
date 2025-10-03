'use client';
import { RepoSearchResultList } from '@/components/AddRepoModal/RepoSearchResultList';
import { useAuth } from '@/hooks/useAuth';
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

  const { isAuthenticated } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setIsBusy(true);
      try {
        const response = await api.getUserRepos();
        if (response.success && response.data) {
          setFetchedRepos(response.data);
          setFilteredResults(response.data);
        } else {
          console.error('Failed to fetch repositories');
        }
      } catch (error) {
        console.error('Failed to fetch repositories:', error);
      } finally {
        setIsBusy(false);
      }
    };
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);
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
      <div className="sticky top-0 z-10 bg-base-100 flex flex-col gap-4 p-6">
        <h3 className="font-bold text-lg">Add Repository to Track</h3>
        <SearchField onSearchSubmit={handleSearch} isBusy={isBusy} />
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-20">
            ✕
          </button>
        </form>
      </div>
      <RepoSearchResultList
        filteredResults={filteredResults}
        trackedRepoIds={trackedRepoIds}
        setTrackedRepos={setTrackedRepos}
        setCurrentRepo={setCurrentRepo}
      />
    </div>
  );
}
