'use client';

import { PullRequestCard } from '@/components/PullRequestsList/PullRequestCard';

interface PullRequestsListProps {
  pullRequests: (GitHubPullRequest & { repo: string })[];
}
export default function PullRequestsList({
  pullRequests,
}: PullRequestsListProps) {
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
