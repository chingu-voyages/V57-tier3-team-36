'use client';

import SearchIcon from '@/icons/SearchIcon';
import SortIcon from '@/icons/SortIcon';
import type { PRFilterState } from '@/types/PRFilterState';
import { useEffect, useState } from 'react';
import PRFilter from './PRFilter';

export default function PRSearchbar({
  query,
  dir,
  onDirChange,
  onSearch,
  filters,
  setFilters,
}: {
  query: string;
  dir: string;
  onDirChange: () => void;
  onSearch: (query: string) => void;
  filters: PRFilterState;
  setFilters: (filters: PRFilterState) => void;
}) {
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (inputValue.trim() === '' && query !== '') {
      onSearch('');
    }
  }, [inputValue, query, onSearch]);

  return (
    <div className="w-full flex gap-2">
      <label className="input w-full">
        <SearchIcon />
        <input
          type="search"
          className="grow"
          placeholder="Search"
          onChange={e => setInputValue(e.target.value)}
          onSubmit={e => onSearch(inputValue)}
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
