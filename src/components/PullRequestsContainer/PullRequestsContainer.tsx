'use client';

import PRSearchbar from '@/components/PRSearchbar/PRSearchbar';
import filterBasePRs from '@/components/PullRequestsContainer/filterBasePRs';
import isDefaultFilters from '@/components/PullRequestsContainer/isDefaultFilters';
import PullRequestsList from '@/components/PullRequestsList/PullRequestsList';
import { useAppContext } from '@/hooks/useAppContext';
import { useAuth } from '@/hooks/useAuth';
import { usePullRequestsSearch } from '@/hooks/usePullRequestsSearch';
import type { PRFilterState } from '@/types/PRFilterState';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import updateSearchParams from './updateSearchParams';

export default function PullRequestsContainer() {
  // hooks
  const { pullRequests: basePRs } = useAppContext();
  const { searchPullRequests } = usePullRequestsSearch();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  // states
  const [pullRequests, setPullRequests] = useState(basePRs ?? []);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [dir, setDir] = useState(searchParams.get('dir') || 'desc');
  const [filters, setFilters] = useState<PRFilterState>({
    prStatus: (searchParams.get('status') as 'open' | 'merged') || 'open',
    involvesMe: searchParams.get('involves') === 'true',
    reviewProgress:
      (searchParams.get('review') as
        | 'none'
        | 'approved'
        | 'changes_requested'
        | null) || null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // on load, set the pull requests
  useEffect(() => {
    setPullRequests(basePRs ?? []);
  }, [basePRs]);

  // sync the state with the url
  useEffect(() => {
    const paramQ = searchParams.get('q') || '';
    const paramDir = searchParams.get('dir') || 'desc';
    const paramStatus =
      (searchParams.get('status') as 'open' | 'merged') || 'open';
    const paramInvolves = searchParams.get('involves') === 'true';
    const paramReview =
      (searchParams.get('review') as
        | 'none'
        | 'approved'
        | 'changes_requested'
        | null) || null;

    if (paramQ !== query) setQuery(paramQ);
    if (paramDir !== dir) setDir(paramDir);

    setFilters(prev => {
      const next = {
        prStatus: paramStatus,
        involvesMe: paramInvolves,
        reviewProgress: paramReview,
      };
      if (
        prev.prStatus !== next.prStatus ||
        prev.involvesMe !== next.involvesMe ||
        prev.reviewProgress !== next.reviewProgress
      ) {
        return next;
      }
      return prev;
    });
  }, [searchParams]);

  // optimization
  const filteredPRs = useMemo(() => {
    return filterBasePRs(basePRs ?? [], filters, query, user?.email ?? '');
  }, [basePRs, filters, query, user]);

  const prevQueryFilterRef = useRef<{
    filters: PRFilterState;
    query: string;
  } | null>(null);

  const fetchSearchData = useCallback(async () => {
    // Check if the query and filters are the same as before
    const sameAsBefore =
      prevQueryFilterRef.current &&
      prevQueryFilterRef.current.query === query &&
      JSON.stringify(prevQueryFilterRef.current.filters) ===
        JSON.stringify(filters);
    if (sameAsBefore) {
      return;
    }
    prevQueryFilterRef.current = { filters, query };

    if (isDefaultFilters(filters, query)) {
      setPullRequests(basePRs ?? []);
      return;
    }

    // if less than 100 PRs, don't search
    if (basePRs && basePRs.length < 100 && filters.prStatus !== 'merged') {
      setPullRequests([...filteredPRs]);
      return;
    }
    // otherwise, search
    setIsLoading(true);
    try {
      const response = await searchPullRequests({
        query,
        dir,
        status: filters.prStatus,
        involves: filters.involvesMe,
        review: filters.reviewProgress,
      });
      setPullRequests(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Error searching pull requests:', error);
      setPullRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [filters, query, basePRs, user, searchPullRequests]);

  // on update of state, update the url
  useEffect(() => {
    updateSearchParams({ query, filters, dir, searchParams, router });
  }, [filters, query, dir]);

  useEffect(() => {
    fetchSearchData();
  }, [query, filters]);

  const sortedPRs = useMemo(() => {
    if (!pullRequests.length) return [];
    return [...pullRequests].sort((a, b) => {
      const aTime = new Date(a.updated_at).getTime();
      const bTime = new Date(b.updated_at).getTime();
      return dir === 'asc' ? aTime - bTime : bTime - aTime;
    });
  }, [pullRequests, dir]);

  const handleSearch = useCallback(
    (newQuery: string) => setQuery(newQuery.trim()),
    []
  );
  const toggleSort = () => setDir(dir === 'asc' ? 'desc' : 'asc');

  return (
    <>
      <div
        data-label="SearchBar"
        className="flex flex-shrink-0 w-full mb-3 gap-2"
      >
        <PRSearchbar
          query={query}
          dir={dir}
          onDirChange={toggleSort}
          onSearch={handleSearch}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
      <PullRequestsList
        processedPullRequests={sortedPRs}
        isProcessing={isLoading}
      />
    </>
  );
}
