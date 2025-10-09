'use client';

import PRSearchbar from '@/components/PRSearchbar/PRSearchbar';
import PullRequestsList from '@/components/PullRequestsList/PullRequestsList';
import { useAuth } from '@/hooks/useAuth';
import { usePullRequests } from '@/hooks/usePullRequests';
import { usePullRequestsSearch } from '@/hooks/usePullRequestsSearch';
import type { PRFilterState } from '@/types/PRFilterState';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function PullRequestsContainer() {
  // hooks
  const basePRs = usePullRequests();
  const { searchPullRequests } = usePullRequestsSearch();
  const router = useRouter();
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

  const fetchSearchData = async () => {
    const isDefaultFilters =
      filters.prStatus === 'open' &&
      filters.involvesMe === false &&
      filters.reviewProgress === null;

    if (!query.trim() && isDefaultFilters) {
      setPullRequests(basePRs ?? []);
      return;
    }

    if (basePRs && basePRs.length < 100 && filters.prStatus !== 'merged') {
      const filteredPRs = basePRs.filter(pr => {
        const matchesQuery = query.trim()
          ? pr.title.toLowerCase().includes(query.trim().toLowerCase())
          : true;
        const matchesStatus = filters.prStatus
          ? pr.state === filters.prStatus
          : true;
        const matchesInvolves = filters.involvesMe
          ? pr.user.login === user?.name
          : true;
        // approximate client-side filtering for review status without making a network request
        const matchesReview =
          filters.reviewProgress === null
            ? true
            : (() => {
                if (filters.reviewProgress === 'none') {
                  return (
                    pr.review_comments === 0 &&
                    (!pr.requested_reviewers ||
                      pr.requested_reviewers.length === 0)
                  );
                }
                if (filters.reviewProgress === 'approved') {
                  return pr.merged_at !== null;
                }
                if (filters.reviewProgress === 'changes_requested') {
                  return pr.review_comments > 0 && pr.state === 'open';
                }
                return true;
              })();

        return (
          matchesQuery && matchesStatus && matchesInvolves && matchesReview
        );
      });

      setPullRequests([...filteredPRs]);
      return;
    }

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
  };

  // on update of state, update the url and fetch the data
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) params.set('q', query.trim());
    else params.delete('q');

    if (filters.prStatus) params.set('status', filters.prStatus);
    else params.delete('status');

    if (filters.involvesMe) params.set('involves', String(filters.involvesMe));
    else params.delete('involves');

    if (filters.reviewProgress) params.set('review', filters.reviewProgress);
    else params.delete('review');

    const currentDir = dir;
    params.delete('dir');

    const orderedParams = new URLSearchParams();
    for (const [key, value] of params.entries()) {
      orderedParams.append(key, value);
    }
    orderedParams.append('dir', currentDir);

    const newUrl = `?${orderedParams.toString()}`;
    const currentUrl = `?${searchParams.toString()}`;
    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }

    fetchSearchData();
  }, [filters, query]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    const currentDir = dir;
    params.delete('dir');

    const orderedParams = new URLSearchParams();
    for (const [key, value] of params.entries()) {
      orderedParams.append(key, value);
    }
    orderedParams.append('dir', currentDir);

    const newUrl = `?${orderedParams.toString()}`;
    const currentUrl = `?${searchParams.toString()}`;
    if (newUrl !== currentUrl) {
      router.push(newUrl);
    }
  }, [dir]);

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
      {isLoading ? (
        <div className="skeleton flex-1 min-h-0 rounded-box outline outline-offset-1" />
      ) : !sortedPRs || sortedPRs.length === 0 ? (
        <div className="flex-1 min-h-0 rounded-box outline outline-offset-1">
          <p className="m-4 text-center">No pull requests found</p>
        </div>
      ) : (
        <PullRequestsList pullRequests={sortedPRs} />
      )}
    </>
  );
}
