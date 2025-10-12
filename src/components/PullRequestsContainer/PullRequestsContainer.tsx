'use client';

import PullRequestsList from '@/components/PullRequestsList/PullRequestsList';
import { useAppContext } from '@/hooks/useAppContext';
import { useAuth } from '@/hooks/useAuth';
import type { PRFilterState } from '@/types/PRFilterState';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import updateSearchParams from './updateSearchParams';
import { searchPullRequests } from './searchPullRequests';
import SearchIcon from '@/icons/SearchIcon';
import SortIcon from '@/icons/SortIcon';
import ResetIcon from '@/icons/ResetIcon';
import cn from '@/utils/twcn';
import { getFilters } from './getFilters';

export default function PullRequestsContainer() {
  // hooks
  const { pullRequests, repos, isLoadingPullRequests } = useAppContext();
  const searchParams = useSearchParams();
  const { isAuthenticated } = useAuth();

  // states
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<GitHubPullRequest[]>();
  const [query, setQuery] = useState<string>(searchParams.get('q') || '');
  const [sortDirection, setSortDirection] = useState<string>(
    searchParams.get('sortDirection') || 'desc'
  );
  const [searchMode, setSearchMode] = useState<'search' | 'filter'>();

  useEffect(() => {
    setSearchMode(undefined);
  }, [repos, pullRequests]);

  const filtersState = getFilters(searchParams);
  const [filters, setFilters] = useState<PRFilterState>(filtersState);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const previousSearchRef = useRef<string>('');

  const router = useRouter();

  const handleSearch = (mode: 'search' | 'filter') => {
    const fetchSearchData = async () => {
      if (!isAuthenticated || !repos) return;

      const params = {
        query,
        dir: sortDirection,
        status: filters.prStatus,
        involves: filters.involvesMe,
        review: filters.reviewProgress,
        repos,
      };
      if (previousSearchRef.current === JSON.stringify({ ...params })) {
        console.info('duplicate request detected');
        return;
      }

      previousSearchRef.current = JSON.stringify({ ...params });
      setIsLoading(true);

      try {
        const response = await searchPullRequests(params);
        setSearchResults(response);
        if (response && response.length > 0) {
          setSearchMode(mode);
        }
      } catch (error) {
        console.error('Error searching pull requests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchData();
  };

  const sortedPRs = (pullRequests || []).sort((a, b) => {
    const aTime = new Date(a.updated_at).getTime();
    const bTime = new Date(b.updated_at).getTime();
    return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
  });

  const sortedSearchResults = (searchResults || []).sort((a, b) => {
    const aTime = new Date(a.updated_at).getTime();
    const bTime = new Date(b.updated_at).getTime();
    return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
  });

  const onChangeQuery = (value: string) => {
    setQuery(value);
    updateSearchParams({
      query: value,
      filters,
      dir: sortDirection,
      searchParams,
      router,
    });
  };

  const toggleSort = () => {
    const value = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(value);
    updateSearchParams({
      query,
      filters,
      dir: value,
      searchParams,
      router,
    });
  };

  return (
    <>
      <div
        data-label="SearchBar"
        className="flex flex-shrink-0 w-full mb-3 gap-2"
      >
        <div className="w-full flex gap-2">
          <label className="input w-full">
            <SearchIcon />
            <input
              type="search"
              className="grow"
              placeholder="Search"
              disabled={isLoading}
              onChange={e => {
                const value = e.target.value.trim();
                onChangeQuery(value);
                if (value.length < 3) return;
                handleSearch('search');
              }}
            />
          </label>
          <div className="relative" ref={dropdownRef}>
            <div
              role="button"
              className="btn btn-outline cursor-pointer"
              onClick={() => setOpen(current => !current)}
            >
              Filters
            </div>
            <div
              className={cn(
                'absolute right-0 mt-2 bg-base-100 shadow-md rounded-box w-96 p-4 flex flex-col border border-base-300 z-50 transition-all duration-150 ease-in-out',
                open
                  ? 'opacity-100 scale-100 pointer-events-auto'
                  : 'opacity-0 scale-95 pointer-events-none'
              )}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-neutral-content">
                  Status
                </div>
                <div className="join">
                  <input
                    className="join-item btn btn-sm btn-outline w-16"
                    type="radio"
                    name="status"
                    aria-label="Open"
                    checked={filters.prStatus === 'open'}
                    onChange={() =>
                      setFilters(current => {
                        if (current.prStatus === 'open') return current;
                        return { ...current, prStatus: 'open' };
                      })
                    }
                  />
                  <input
                    className="join-item btn btn-sm btn-outline w-16"
                    type="radio"
                    name="status"
                    aria-label="Merged"
                    checked={filters.prStatus === 'merged'}
                    onChange={() => {
                      setFilters(current => {
                        if (current.prStatus === 'merged') return current;
                        return { ...current, prStatus: 'merged' };
                      });
                    }}
                  />
                </div>
              </div>
              <div className="divider m-0" />
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-neutral-content">
                  Involving Me
                </div>
                <input
                  type="checkbox"
                  className="checkbox checkbox-lg checkbox-primary [&:checked]:shadow-none"
                  checked={filters.involvesMe}
                  onChange={e => {
                    setFilters(current => {
                      const value = e.target.checked;
                      if (current.involvesMe === value) return current;
                      return { ...current, involvesMe: value };
                    });
                  }}
                />
              </div>
              <div className="divider m-0" />
              <div className="flex flex-col gap-2">
                <div className="text-sm font-semibold text-neutral-content">
                  Review Progress
                </div>
                <form
                  className="filter"
                  onReset={e => {
                    e.preventDefault();
                    setFilters(current => {
                      if (current.reviewProgress === null) return current;
                      return {
                        ...current,
                        reviewProgress: null,
                      };
                    });
                  }}
                >
                  <input className="btn btn-square" type="reset" value="×" />
                  <input
                    className="btn text-xs"
                    type="radio"
                    name="review progress"
                    aria-label="Not Reviewed"
                    checked={filters.reviewProgress === 'none'}
                    onChange={() => {
                      setFilters(current => {
                        if (current.reviewProgress === 'none') return current;
                        return {
                          ...current,
                          reviewProgress: 'none',
                        };
                      });
                    }}
                  />
                  <input
                    className="btn text-xs"
                    type="radio"
                    name="review progress"
                    aria-label="Approved"
                    checked={filters.reviewProgress === 'approved'}
                    onChange={() => {
                      setFilters(current => {
                        if (current.reviewProgress === 'approved')
                          return current;
                        return {
                          ...current,
                          reviewProgress: 'approved',
                        };
                      });
                    }}
                  />
                  <input
                    className="btn  text-xs"
                    type="radio"
                    name="review progress"
                    aria-label="Changes Requested"
                    checked={filters.reviewProgress === 'changes_requested'}
                    onChange={() => {
                      setFilters(current => {
                        if (current.reviewProgress === 'changes_requested')
                          return current;
                        return {
                          ...current,
                          reviewProgress: 'changes_requested',
                        };
                      });
                    }}
                  />
                </form>
              </div>
              <div className="divider m-0" />
              <div className="flex flex gap-2">
                <button
                  disabled={isLoading}
                  className="btn flex-1 btn-primary btn-outline"
                  onClick={() => handleSearch('filter')}
                >
                  Apply Filters
                </button>
                <button
                  className="btn flex-1 btn-secondary btn-outline"
                  onClick={() => setFilters(filtersState)}
                >
                  Clear Filters
                  <ResetIcon />
                </button>
              </div>
            </div>
          </div>
          <button
            className="kbd aspect-square h-full p-0 flex items-center justify-center cursor-pointer"
            onClick={toggleSort}
            disabled={searchMode === 'search'}
          >
            <SortIcon
              down={searchMode === 'search' ? true : sortDirection === 'desc'}
            />
          </button>
        </div>
      </div>
      <PullRequestsList
        pullRequests={
          searchMode === 'search'
            ? [...(searchResults || []), ...(pullRequests || [])]
            : searchMode === 'filter'
              ? sortedSearchResults
              : sortedPRs
        }
        isLoading={isLoadingPullRequests === true}
      />
    </>
  );
}
