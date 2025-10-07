'use client';

import PRSearchbar from '@/components/PRSearchbar/PRSearchbar';
import PRSearchbarSkeleton from '@/components/PRSearchbar/PRSearchbarSkeleton';
import PullRequestsList from '@/components/PullRequestsList/PullRequestsList';
import { usePullRequests } from '@/hooks/usePullRequests';
import { usePullRequestsSearch } from '@/hooks/usePullRequestsSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

export default function PullRequestsContainer() {
  const basePRs = usePullRequests();
  const { searchPullRequests } = usePullRequestsSearch();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [pullRequests, setPullRequests] = useState(basePRs ?? []);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [dir, setDir] = useState(searchParams.get('dir') || 'desc');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sorted = [...(basePRs ?? [])].sort((a, b) => {
      const aTime = new Date(a.updated_at).getTime();
      const bTime = new Date(b.updated_at).getTime();
      return dir === 'asc' ? aTime - bTime : bTime - aTime;
    });
    setPullRequests(sorted ?? []);
  }, [basePRs]);

  useEffect(() => {
    const paramQ = searchParams.get('q') || '';
    const paramDir = searchParams.get('dir') || 'desc';
    if (paramQ !== query) setQuery(paramQ);
    if (paramDir !== dir) setDir(paramDir);
  }, [searchParams]);

  useEffect(() => {
    if (!pullRequests.length) return;
    setPullRequests(prev => {
      const sorted = [...prev].sort((a, b) => {
        const aTime = new Date(a.updated_at).getTime();
        const bTime = new Date(b.updated_at).getTime();
        return dir === 'asc' ? aTime - bTime : bTime - aTime;
      });
      return sorted;
    });
  }, [dir]);

  const handleSearch = async (newQuery: string) => {
    const trimmed = newQuery.trim();

    if (!trimmed) {
      setPullRequests([...(basePRs ?? [])]);

      const params = new URLSearchParams(searchParams.toString());
      params.delete('q');
      router.push(`?${params.toString()}`);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('q', trimmed);
    params.delete('dir');
    params.set('dir', dir);
    router.push(`?${params.toString()}`);

    setIsLoading(true);
    try {
      const response = await searchPullRequests(trimmed, dir);

      if (Array.isArray(response)) {
        setPullRequests([...response]);
      } else {
        console.log(response);
        setPullRequests([]);
      }
    } catch (error) {
      console.error('Error searching pull requests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSort = async () => {
    const newDir = dir === 'asc' ? 'desc' : 'asc';
    setDir(newDir);

    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) params.set('q', query);
    params.delete('dir');
    params.set('dir', newDir);
    router.push(`?${params.toString()}`);

    if (!query.trim()) return;

    try {
      setIsLoading(true);
      const response = await searchPullRequests(query, newDir);
      if (Array.isArray(response)) setPullRequests([...response]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        data-label="SearchBar"
        className="flex flex-shrink-0 w-full mb-3 gap-2"
      >
        <Suspense fallback={<PRSearchbarSkeleton />}>
          <PRSearchbar
            query={query}
            dir={dir}
            onQueryChange={setQuery}
            onDirChange={toggleSort}
            onSearch={handleSearch}
          />
        </Suspense>
      </div>
      {isLoading ? (
        <div className="skeleton w-full flex-1 min-h-0 rounded-box outline outline-offset-[-1px]"></div>
      ) : (
        <PullRequestsList pullRequests={pullRequests} />
      )}
    </>
  );
}
