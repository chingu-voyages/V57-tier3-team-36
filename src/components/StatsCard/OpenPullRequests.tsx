'use client';

import StatsCard from '@/components/StatsCard/StatsCard';
import { useAppContext } from '@/hooks/useAppContext';
import { useEffect, useState } from 'react';

export default function OpenPullRequests() {
  const title = 'Open PRs' as const;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>('-');
  const { pullRequests, isLoadingPullRequests } = useAppContext();

  useEffect(() => {
    if (isLoadingPullRequests || !pullRequests) return;
    setValue(pullRequests.length.toString());
    setIsLoading(false);
  }, [pullRequests, isLoadingPullRequests]);

  return (
    <StatsCard
      title={title}
      value={value}
      isBusy={isLoading || isLoadingPullRequests}
    />
  );
}
