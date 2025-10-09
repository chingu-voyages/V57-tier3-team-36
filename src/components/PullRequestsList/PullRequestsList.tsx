'use client';

import { PullRequestCard } from '@/components/PullRequestsList/PullRequestCard';

interface PullRequestsListProps {
  pullRequests: (GitHubPullRequest & { repo: string })[];
  isLoading?: boolean;
}
export default function PullRequestsList({
  pullRequests,
  isLoading = false,
}: PullRequestsListProps) {
  if (isLoading)
    return (
      <div className="skeleton menu flex flex-col flex-1 w-full min-h-0 rounded-box outline outline-offset-[-1px] p-0 divide-y flex-nowrap overflow-y-auto"></div>
    );
  if (!pullRequests)
    return (
      <div className="menu flex flex-col flex-1 w-full min-h-0 rounded-box outline outline-offset-[-1px] p-0 divide-y flex-nowrap overflow-y-auto">
        No Pull Requests
      </div>
    );
  return (
    <>
      <ul
        data-label="PullRequestsList"
        className="menu flex flex-col flex-1 w-full min-h-0 rounded-box outline outline-offset-[-1px] p-0 divide-y flex-nowrap overflow-y-auto"
      >
        {pullRequests && pullRequests.length > 0 ? (
          pullRequests.map(props => (
            <PullRequestCard key={props.id} {...props} />
          ))
        ) : (
          <li className="skeleton h-full w-full"></li>
        )}
      </ul>
    </>
  );
}
