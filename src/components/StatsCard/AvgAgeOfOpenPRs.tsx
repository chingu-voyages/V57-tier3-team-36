'use client';

import StatsCard from '@/components/StatsCard/StatsCard';
import { usePullRequests } from '@/hooks/usePullRequests';
import { useEffect, useState } from 'react';
import { getSecondsSince, formatTime } from '@/components/StatsCard/formatTime';

export default function AvgAgeOfOpenPRs() {
  const title = 'Avg Age of Open PRs' as const;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string>('-');
  const [unit, setUnit] = useState<string>();
  const pullRequests = usePullRequests();

  useEffect(() => {
    if (!pullRequests) return;

    const totalSeconds = pullRequests.reduce((sum, obj) => {
      return sum + getSecondsSince(obj.created_at);
    }, 0);

    const avg = totalSeconds / pullRequests.length;
    const [timeValue, label] = formatTime(avg);
    setValue(timeValue);
    setUnit(label);

    setIsLoading(false);
  }, [pullRequests]);

  return (
    <StatsCard title={title} subtitle={unit} value={value} isBusy={isLoading} />
  );
}
