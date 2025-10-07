'use client';

import StatsCard from '@/components/StatsCard/StatsCard';
import { useAppContext } from '@/components/AppProvider/AppProvider';
import { useEffect, useState } from 'react';

export default function NumberOfApprovedPRs() {
  const title = 'Ready PRs' as const;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>('-');
  const { pullRequests } = useAppContext();

  useEffect(() => {
    if (!pullRequests) return;

    const total = pullRequests.reduce((sum, obj) => {
      return obj.mergeable ? sum + 1 : sum;
    }, 0);

    setValue(total.toString());
    setIsLoading(false);
  }, [pullRequests]);

  return <StatsCard title={title} value={value} isBusy={isLoading} />;
}
