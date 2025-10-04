'use client';

import { usePullRequests } from '@/hooks/usePullRequests';
import { PullRequestCard } from '@/components/PullRequestsList/PullRequestCard';

export default function PullRequestsList() {
  const { pullRequests, setPage, page, hasNextPage, hasPreviousPage } =
    usePullRequests();
  const singlePage = page === 1 && !hasNextPage;

  return (
    <ul
      data-label="PullRequestsList"
      className="menu flex flex-col flex-1 w-full min-h-0 rounded-box outline outline-offset-[-1px] p-0 divide-y flex-nowrap overflow-y-auto"
    >
      {pullRequests ? (
        <>
          {pullRequests.map(props => (
            <PullRequestCard key={props.id} {...props} />
          ))}
          {singlePage ? null : (
            <div
              data-label="PageButtons"
              className="join justify-center self-center sticky bottom-4 z-10 bg-base-100 rounded-field shadow-lg"
            >
              <button
                className="join-item btn btn-accent btn-soft"
                disabled={!hasPreviousPage}
                onClick={() =>
                  setPage(current => (current <= 1 ? 1 : current - 1))
                }
              >
                «
              </button>
              <button className="join-item btn btn-accent btn-soft bg-transparent border-none pointer-events-none">
                Page {page}
              </button>
              <button
                className="join-item btn btn-accent btn-soft"
                disabled={!hasNextPage}
                onClick={() => setPage(current => current + 1)}
              >
                »
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="skeleton h-full w-full"></div>
      )}
    </ul>
  );
}
