export default function HomePage() {
  const statsCardStyle =
    'card bg-base-100 w-full sm:max-w-[50%] md:max-w-[25%] px-3 py-2 min-w-[300px]';

  return (
    <div className="w-full h-full grid grid-cols-12 gap-3">
      <div data-label="MainContents" className="col-span-12 md:col-span-8 row-start-2 md:row-start-1">
        <div data-label="SearchBar" className="input w-full mb-3 px-3 py-2">
          Search Bar
        </div>
        <div data-label="PullsList" className="w-full card bg-base-100 px-3 py-2">
          List of Pull Requests
        </div>
      </div>
      <aside
        data-label="StatsCards"
        className="flex flex-wrap gap-3 col-span-12 md:col-span-4 row-start-1"
      >
        <div data-label="StatsCard" className={statsCardStyle}>
          Open PRs
        </div>
        <div data-label="StatsCard" className={statsCardStyle}>
          Avg Reviews Per PR
        </div>
        <div data-label="StatsCard" className={statsCardStyle}>
          Avg Time To First Review
        </div>
        <div data-label="StatsCard" className={statsCardStyle}>
          Avg Time To Merge
        </div>
      </aside>
    </div>
  );
}
