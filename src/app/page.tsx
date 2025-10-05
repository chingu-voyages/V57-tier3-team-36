import PRSearchbar from '@/components/PRSearchbar/PRSearchbar';
import StatsCard from '@/components/StatsCard/StatsCard';

export default function HomePage() {
  return (
    <div
      data-label="HomePage"
      className="w-full h-full grid grid-cols-12 grid-rows-[auto_1fr] md:grid-rows-1 gap-3"
    >
      <div
        data-label="MainContents"
        className="col-span-12 md:col-span-8 xl:col-span-9 row-start-2 md:row-start-1 h-full"
      >
        <div
          data-label="PullsListCard"
          className="card flex flex-col w-full h-full bg-base-100 p-2"
        >
          <div
            data-label="SearchBar"
            className="flex flex-shrink-0 w-full mb-3 gap-2"
          >
            <PRSearchbar />
          </div>
          <div
            data-label="PullsList"
            className="flex-grow w-full px-3 py-2 bg-[blue] overflow-y-auto"
          >
            List of Pull Requests
          </div>
        </div>
      </div>
      <aside
        data-label="StatsCards"
        className="grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-1 col-span-12 md:col-span-4 xl:col-span-3 row-start-1"
      >
        <StatsCard title="Open PRs" value="24" />
        <StatsCard title="Avg Reviews Per PR" value="2.3" />
        <StatsCard
          title="Avg Time To First Review"
          subtitle="Last 30 days"
          value="4.2h"
        />
        <StatsCard title="Avg Time To Merge" value="18.5h" />
      </aside>
    </div>
  );
}
