'use client';

import { PullRequestCard } from '@/components/PullRequestsList/PullRequestCard';

export default function PullRequestsList({
  pullRequests,
  isLoading,
}: {
  pullRequests: GitHubPullRequest[];
  isLoading: boolean;
}) {
  return (
    <ul
      data-label="PullRequestsList"
      className="menu flex flex-col flex-1 w-full min-h-0 rounded-box outline outline-offset-[-1px] p-0 divide-y flex-nowrap overflow-y-auto"
    >
      {isLoading ? (
        <li className="skeleton h-full w-full" />
      ) : (
        pullRequests.map(props => <PullRequestCard key={props.id} {...props} />)
      )}
    </ul>
  );
}
