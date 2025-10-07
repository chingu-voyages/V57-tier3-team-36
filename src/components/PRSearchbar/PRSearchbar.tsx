'use client';

import SortIcon from '@/icons/SortIcon';
import type { PRFilterState } from '@/types/PRFilterState';
import PRFilter from './PRFilter';

export default function PRSearchbar({
  query,
  dir,
  onQueryChange,
  onDirChange,
  onSearch,
  filters,
  setFilters,
}: {
  query: string;
  dir: string;
  onQueryChange: (query: string) => void;
  onDirChange: () => void;
  onSearch: (query: string) => void;
  filters: PRFilterState;
  setFilters: (filters: PRFilterState) => void;
}) {
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          type="search"
          className="grow"
          placeholder="Search"
          onChange={e => onQueryChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') onSearch(query);
          }}
        />
      </label>
      <PRFilter filters={filters} setFilters={setFilters} />
      <button
        className="kbd aspect-square h-full p-0 flex items-center justify-center cursor-pointer"
        onClick={onDirChange}
      >
        <SortIcon down={dir === 'desc'} />
      </button>
    </div>
  );
}
