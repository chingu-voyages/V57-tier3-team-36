'use client';

import { PullRequestCard } from '@/components/PullRequestsList/PullRequestCard';
import { useAppContext } from '@/hooks/useAppContext';

export default function PullRequestsList({
  processedPullRequests,
  isProcessing,
}: {
  processedPullRequests: GitHubPullRequest[];
  isProcessing: boolean;
}) {
  const { pullRequests, isLoadingPullRequests } = useAppContext();

  return (
    <ul
      data-label="PullRequestsList"
      className="menu flex flex-col flex-1 w-full min-h-0 rounded-box outline outline-offset-[-1px] p-0 divide-y flex-nowrap overflow-y-auto"
    >
      {isProcessing || isLoadingPullRequests ? (
        <li className="skeleton h-full w-full" />
      ) : (
        (processedPullRequests || pullRequests)?.map(props => (
          <PullRequestCard key={props.id} {...props} />
        ))
      )}
    </ul>
  );
}
