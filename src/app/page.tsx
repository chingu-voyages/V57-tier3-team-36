import PullRequestsList from '@/components/PullRequestsList/PullRequestsList';

export default function HomePage() {
  const statsCardStyle = 'card bg-base-100 w-full px-3 py-2 h-28 md:h-full';

  return (
    <div
      data-label="HomePage"
      className="w-full h-full grid grid-cols-12 grid-rows-[auto_1fr] md:grid-rows-1 gap-3"
    >
      <div
        data-label="MainContents"
        className="col-span-12 md:col-span-8 xl:col-span-9 row-start-2 md:row-start-1 flex flex-col min-h-0"
      >
        <div
          data-label="PullsListCard"
          className="card flex flex-col flex-1 min-h-0 w-full bg-base-100 py-3"
        >
          <div
            data-label="SearchBar"
            className="flex-shrink-0 w-full mb-3 px-3"
          >
            <input type="search" className="input w-full bg-base-content text-neutral" placeholder="Search"></input>
          </div>
          <div className="flex flex-1 w-full min-h-0 overflow-y-auto -mr-4">
            <PullRequestsList />
          </div>
        </div>
      </div>
      <aside
        data-label="StatsCards"
        className="grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-1 col-span-12 md:col-span-4 xl:col-span-3 row-start-1"
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
