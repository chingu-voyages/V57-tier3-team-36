'use client';

import { usePullRequestsSearch } from '@/hooks/usePullRequestsSearch';
import SortIcon from '@/icons/SortIcon';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PRFilter from './PRFilter';

export default function PRSearchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialDir = searchParams.get('dir') || 'desc';

  const [query, setQuery] = useState(initialQuery);
  const [dir, setDir] = useState(initialDir);

  const { searchPullRequests } = usePullRequestsSearch();

  useEffect(() => {
    setQuery(initialQuery);
    setDir(initialDir);
  }, [initialQuery, initialDir]);

  const handleSearch = async (newQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('q', newQuery);
    params.set('dir', dir);
    router.push(`?${params.toString()}`);

    const response = await searchPullRequests(newQuery);
    console.log({ response });
    return response;
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) await handleSearch(trimmed);
    }
  };

  const toggleSort = () => {
    const newDir = dir === 'asc' ? 'desc' : 'asc';
    setDir(newDir);

    const params = new URLSearchParams(searchParams.toString());
    if (params.has('q')) params.set('q', query);
    params.set('dir', newDir);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full flex gap-2">
      <label className="input w-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow"
          placeholder="Search"
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </label>
      <PRFilter />
      <button
        className="kbd aspect-square h-full p-0 flex items-center justify-center cursor-pointer"
        onClick={toggleSort}
      >
        <SortIcon down={dir === 'desc'} />
      </button>
    </div>
  );
}
