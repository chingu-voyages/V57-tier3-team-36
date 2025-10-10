'use client';

import { RepoSearchResultCard } from '@/components/AddRepoModal/RepoSearchResultCard';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';
import { useEffect, useState } from 'react';
import { SearchField } from './SearchField';
import { useAppContext } from '@/hooks/useAppContext';
import { fetchRepos } from './fetchRepos';

export default function AddRepoModal() {
  const { isAuthenticated } = useAuth();
  const { modalRef } = useAppContext();

  const [inputValue, setInputValue] = useState<string>('');

  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [searchResults, setSearchResults] = useState<GitHubRepo[]>([]);

  const [_isFetching, setIsFetching] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (!isAuthenticated) return;
      setIsFetching(true);
      const reposResult = await fetchRepos();
      setRepos(reposResult);
      setIsFetching(false);
    })();
  }, [isAuthenticated]);

  const filteredResults =
    inputValue === ''
      ? repos
      : repos.filter(repo => {
          const searchQuery = inputValue.trim().toLowerCase();
          return (
            repo.name.toLowerCase().includes(searchQuery) ||
            (repo.description &&
              repo.description.toLowerCase().includes(searchQuery))
          );
        });

  const uniqueResults = Array.from(
    new Map(
      [...searchResults, ...filteredResults].map(obj => [obj.id, obj])
    ).values()
  );

  const handleSearch = (value: string) => {
    const searchQuery = value.trim().toLowerCase();

    const search = async (searchQuery: string) => {
      setIsSearching(true);
      const response = await api.searchRepositories(searchQuery);
      if (!response.success) return;
      setSearchResults(response.data?.items);
      setIsSearching(false);
    };

    if (searchQuery.length >= 3) {
      search(inputValue);
    }
  };

  if (!isAuthenticated) return null;
  return (
    <dialog data-label="AddRepoModal" className="modal" ref={modalRef}>
      <div className="modal-box max-w-3xl h-3/5 p-0">
        <div className="sticky top-0 z-10 bg-base-100 flex flex-col gap-4 p-6">
          <h3 className="font-bold text-lg">Add Repository to Track</h3>
          <SearchField searching={isSearching}>
            <input
              type="search"
              className="w-full"
              placeholder="Search"
              onChange={event => {
                const value = event.currentTarget.value;
                setInputValue(value);
                handleSearch(value);
              }}
              value={inputValue}
            />
          </SearchField>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-20">
              ✕
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {uniqueResults.map(repo => (
            <RepoSearchResultCard
              key={repo.id}
              id={repo.id}
              name={repo.name}
              url={repo.html_url}
              description={repo.description}
            />
          ))}
        </div>
      </div>
    </dialog>
  );
}
