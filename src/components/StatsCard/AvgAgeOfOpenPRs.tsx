'use client';

import StatsCard from '@/components/StatsCard/StatsCard';
import { useAppContext } from '@/hooks/useAppContext';
import { useEffect, useState } from 'react';
import { getSecondsSince, formatTime } from '@/components/StatsCard/formatTime';

export default function AvgAgeOfOpenPRs() {
  const title = 'Avg Age of Open PRs' as const;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>('-');
  const [unit, setUnit] = useState<string>();
  const { pullRequests, isLoadingPullRequests } = useAppContext();

  useEffect(() => {
    if (isLoadingPullRequests || !pullRequests) return;

    const totalSeconds = pullRequests.reduce((sum, obj) => {
      return sum + getSecondsSince(obj.created_at);
    }, 0);

    const avg = totalSeconds / pullRequests.length;
    const [timeValue, label] = formatTime(avg);
    setValue(timeValue);
    setUnit(label);

    setIsLoading(false);
  }, [pullRequests, isLoadingPullRequests]);

  return (
    <StatsCard
      title={title}
      subtitle={unit}
      value={value}
      isBusy={isLoading || isLoadingPullRequests}
    />
  );
}
