import AveragePrReviewsWidget from '@/components/AveragePrReviewsWidget/AveragePrReviewsWidget';
import PullRequestsContainer from '@/components/PullRequestsContainer/PullRequestsContainer';
import AvgAgeOfOpenPRs from '@/components/StatsCard/AvgAgeOfOpenPRs';
import OpenPullRequests from '@/components/StatsCard/OpenPullRequests';
import PercentOfDraftPRs from '@/components/StatsCard/PercentOfDraftPRs';
import { Suspense } from 'react';

export default async function HomePage() {
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
          <Suspense fallback={null}>
            <PullRequestsContainer />
          </Suspense>
        </div>
      </div>
      <aside
        data-label="StatsCards"
        className="grid gap-3 grid-cols-2 sm:grid-cols-4 md:grid-cols-1 col-span-12 md:col-span-4 xl:col-span-3 row-start-1"
      >
        <OpenPullRequests />
        {/* <AveragePrReviewsWidget /> */}
        <AvgAgeOfOpenPRs />
        <PercentOfDraftPRs />
      </aside>
    </div>
  );
}
