'use client';

import { usePullRequests } from '@/hooks/usePullRequests';

export default function PRSearchbar() {
  const { searchPullRequests } = usePullRequests();

  const handleSearch = async (query: string) => {
    console.log('current query', query);
    const response = await searchPullRequests(query);
    console.log({ response });
    return response;
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = e.currentTarget.value;
      if (query.trim().length > 0) {
        await handleSearch(query);
      }
    }
  };

  return (
    <div>
      <label className="input">
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
          onKeyDown={handleKeyDown}
        />
      </label>
    </div>
  );
}
