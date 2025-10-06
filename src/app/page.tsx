import AveragePrReviewsWidget from '@/components/AveragePrReviewsWidget/AveragePrReviewsWidget';
import PullRequestsList from '@/components/PullRequestsList/PullRequestsList';
import StatsCard from '@/components/StatsCard/StatsCard';
import FilterIcon from '@/icons/FilterIcon';
import SortIcon from '@/icons/SortIcon';

export default function HomePage() {
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
          className="card flex flex-col flex-1 min-h-0 w-full"
        >
          <div
            data-label="SearchBar"
            className="flex flex-shrink-0 w-full mb-3 gap-2"
          >
            <input
              type="search"
              className="input w-full bg-base-content text-neutral focus:outline-none focus:border-accent border-2"
              placeholder="Search Pull Requests"
            ></input>
            <button className="btn btn-accent aspect-square p-0">
              <SortIcon />
            </button>
            <button className="btn btn-accent aspect-square p-0">
              <FilterIcon />
            </button>
          </div>

          <PullRequestsList />
        </div>
      </div>
      <aside
        data-label="StatsCards"
        className="grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-1 col-span-12 md:col-span-4 xl:col-span-3 row-start-1"
      >
        <StatsCard title="Open PRs" value="24" />
        <AveragePrReviewsWidget />
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
