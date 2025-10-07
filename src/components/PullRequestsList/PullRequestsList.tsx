'use client';

import { useAppContext } from '@/components/AppProvider/AppProvider';
import { PullRequestCard } from '@/components/PullRequestsList/PullRequestCard';

export default function PullRequestsList() {
  const { pullRequests } = useAppContext();

  return (
    <ul
      data-label="PullRequestsList"
      className="menu flex flex-col flex-1 w-full min-h-0 rounded-box outline outline-offset-[-1px] p-0 divide-y flex-nowrap overflow-y-auto"
    >
      {pullRequests ? (
        pullRequests.map(props => <PullRequestCard key={props.id} {...props} />)
      ) : (
        <div className="skeleton h-full w-full"></div>
      )}
    </ul>
  );
}
