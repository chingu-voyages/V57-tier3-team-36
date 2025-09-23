"use client";

export function SearchField({
  onSearchSubmit,
  isBusy,
}: {
  isBusy?: boolean;
  onSearchSubmit?: (query: string) => void;
}) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchSubmit) return;
    const query = event.target.value;
    if (query && query.trim().length > 3) {
      onSearchSubmit(query);
    }
  };
  return (
    <div className="flex">
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
          className="w-full"
          placeholder="Search"
          onChange={handleSearchChange}
          disabled={isBusy}
        />
      </label>
    </div>
  );
}
