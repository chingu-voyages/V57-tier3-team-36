'use client';

import StatsCard from '@/components/StatsCard/StatsCard';
import { usePullRequests } from '@/hooks/usePullRequests';
import { useEffect, useState } from 'react';

export default function OpenPullRequests() {
  const title = 'Open PRs' as const;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>('-');
  const pullRequests = usePullRequests();

  useEffect(() => {
    if (!pullRequests) return;
    setValue(pullRequests.length.toString());
    setIsLoading(false);
  }, [pullRequests]);

  return <StatsCard title={title} value={value} isBusy={isLoading} />;
}
