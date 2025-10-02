'use client';
import { RepoSearchResultList } from '@/components/AddRepoModal/RepoSearchResultList';
import { api } from '@/lib/github/client';
import { useEffect, useState } from 'react';
import { SearchField } from './SearchField';

export function SearchComponent() {
  const [fetchedRepos, setFetchedRepos] = useState<GitHubRepo[]>([]);
  const [filteredResults, setFilteredResults] = useState<GitHubRepo[]>([]);
  const [isBusy, setIsBusy] = useState(false);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsBusy(true);
  //     const response = await api.getUserRepos();
  //     if (response.success && response.data) {
  //       setFetchedRepos(response.data);
  //       setFilteredResults(response.data);
  //     } else {
  //       console.error('Failed to fetch repositories');
  //     }
  //     setIsBusy(false);
  //   };

  //   fetchData();
  // }, []);
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    const lowerCaseQuery = query.toLowerCase();
    const results = fetchedRepos.filter(
      repo =>
        repo.name.toLowerCase().includes(lowerCaseQuery) ||
        (repo.description &&
          repo.description.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredResults(results);
    console.log('Search results:', results);
  };

  return (
    <div>
      <SearchField onSearchSubmit={handleSearch} isBusy={isBusy} />
      <RepoSearchResultList filteredResults={filteredResults} />
    </div>
  );
}
