import AveragePrReviewsWidget from '@/components/AveragePrReviewsWidget/AveragePrReviewsWidget';
import PullRequestsList from '@/components/PullRequestsList/PullRequestsList';
import SortIcon from '@/icons/SortIcon';
import FilterIcon from '@/icons/FilterIcon';
import AvgAgeOfOpenPRs from '@/components/StatsCard/AvgAgeOfOpenPRs';
import OpenPullRequests from '@/components/StatsCard/OpenPullRequests';
import PercentOfDraftPRs from '@/components/StatsCard/PercentOfDraftPRs';

export default async function HomePage() {
  const { isAuthenticated } = await getServerSession();
  if (!isAuthenticated) return null;
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
        <OpenPullRequests />
        <AvgAgeOfOpenPRs />
        <PercentOfDraftPRs />
      </aside>
    </div>
  );
}
