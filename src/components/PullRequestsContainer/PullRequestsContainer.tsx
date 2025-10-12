'use client';

import filterBasePRs from '@/components/PullRequestsContainer/filterBasePRs';
import isDefaultFilters from '@/components/PullRequestsContainer/isDefaultFilters';
import PullRequestsList from '@/components/PullRequestsList/PullRequestsList';
import { useAppContext } from '@/hooks/useAppContext';
import { useAuth } from '@/hooks/useAuth';
import type { PRFilterState } from '@/types/PRFilterState';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import updateSearchParams from './updateSearchParams';
import { searchPullRequests } from './searchPullRequests';
import SearchIcon from '@/icons/SearchIcon';
import SortIcon from '@/icons/SortIcon';
import PRFilter from './PRFilter';

const defaultFilters = {
  prStatus: 'open',
  involvesMe: false,
  reviewProgress: null,
} as const;

export default function PullRequestsContainer() {
  // hooks
  const { pullRequests } = useAppContext();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // states
  const [searchResults, setSearchResults] = useState<GitHubPullRequest[]>();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [sortDirection, setSortDirection] = useState(
    searchParams.get('sortDirection') || 'desc'
  );
  // const [filters, setFilters] = useState<PRFilterState>({
  //   prStatus: (searchParams.get('status') as 'open' | 'merged') || 'open',
  //   involvesMe: searchParams.get('involves') === 'true',
  //   reviewProgress:
  //     (searchParams.get('review') as
  //       | 'none'
  //       | 'approved'
  //       | 'changes_requested'
  //       | null) || null,
  // });
  const [filters, setFilters] = useState<PRFilterState>(defaultFilters);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // sync the state with the url
  // useEffect(() => {
  //   const paramQ = searchParams.get('q') || '';
  //   const paramDir = searchParams.get('sortDirection') || 'desc';
  //   // const paramStatus =
  //   //   (searchParams.get('status') as 'open' | 'merged') || 'open';
  //   // const paramInvolves = searchParams.get('involves') === 'true';
  //   // const paramReview =
  //   //   (searchParams.get('review') as
  //   //     | 'none'
  //   //     | 'approved'
  //   //     | 'changes_requested'
  //   //     | null) || null;

  //   if (paramQ !== query) setQuery(paramQ);
  //   if (paramDir !== sortDirection) setSortDirection(paramDir);

  //   // setFilters(prev => {
  //   //   const next = {
  //   //     prStatus: paramStatus,
  //   //     involvesMe: paramInvolves,
  //   //     reviewProgress: paramReview,
  //   //   };
  //   //   if (
  //   //     prev.prStatus !== next.prStatus ||
  //   //     prev.involvesMe !== next.involvesMe ||
  //   //     prev.reviewProgress !== next.reviewProgress
  //   //   ) {
  //   //     return next;
  //   //   }
  //   //   return prev;
  //   // });
  // }, [searchParams, sortDirection, query]);

  useEffect(() => {
    const fetchSearchData = async () => {
      // if less than 100 PRs, don't search
      if (pullRequests && pullRequests.length < 100) {
        return;
      }

      // otherwise, search
      // setIsLoading(true);
      // try {
      //   const response = await searchPullRequests({
      //     query,
      //     sortDirection,
      //     status: filters.prStatus,
      //     involves: filters.involvesMe,
      //     review: filters.reviewProgress,
      //   });
      // } catch (error) {
      //   console.error('Error searching pull requests:', error);
      // } finally {
      //   setIsLoading(false);
      // }
    };

    fetchSearchData();
  }, [query, pullRequests]);

  const sortedPRs = (pullRequests || []).sort((a, b) => {
    const aTime = new Date(a.updated_at).getTime();
    const bTime = new Date(b.updated_at).getTime();
    return sortDirection === 'asc' ? aTime - bTime : bTime - aTime;
  });

  const handleSearch = (newQuery: string) => {
    const value = newQuery.trim();
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
              onChange={e => {
                const value = e.target.value.trim();
                if (value.length < 3) return;
                handleSearch(value);
              }}
            />
          </label>
          <PRFilter filters={filters} setFilters={setFilters} />
          <button
            className="kbd aspect-square h-full p-0 flex items-center justify-center cursor-pointer"
            onClick={toggleSort}
          >
            <SortIcon down={sortDirection === 'desc'} />
          </button>
        </div>
      </div>
      <PullRequestsList pullRequests={sortedPRs} isLoading={isLoading} />
    </>
  );
}
