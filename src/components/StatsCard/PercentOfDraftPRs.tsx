'use client';

import StatsCard from '@/components/StatsCard/StatsCard';
import { useAppContext } from '@/hooks/useAppContext';
import { useEffect, useState } from 'react';

export default function PercentOfDraftPRs() {
  const title = 'Draft PRs' as const;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<number>();
  const { pullRequests, isLoadingPullRequests } = useAppContext();

  useEffect(() => {
    if (isLoadingPullRequests || !pullRequests) return;

    if (pullRequests.length === 0) {
      setValue(0);
    } else {
      const total = pullRequests.reduce((sum, obj) => {
        return obj.draft ? sum + 1 : sum;
      }, 0);

      const avg = Math.round((total / pullRequests.length) * 100);
      setValue(avg);
    }

    setIsLoading(false);
  }, [pullRequests, isLoadingPullRequests]);

  return (
    <StatsCard
      title={title}
      value={value === undefined ? '-' : `${value}%`}
      isBusy={isLoading || isLoadingPullRequests}
    />
  );
}
