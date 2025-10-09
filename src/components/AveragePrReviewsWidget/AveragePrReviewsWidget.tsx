'use client';

import StatsCard from '@/components/StatsCard/StatsCard';
import { useAppContext } from '@/hooks/useAppContext';
import { useEffect, useState } from 'react';
import { calculateAverageReviewsPerPr } from './calculateAverageReviewsPerPr';

export default function AveragePrReviewsWidget() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [value, setValue] = useState<string | null>(null);
  const { pullRequests, isLoadingPullRequests } = useAppContext();

  useEffect(() => {
    (async () => {
      if (isLoadingPullRequests || !pullRequests) return;
      try {
        const calculatedAverage =
          await calculateAverageReviewsPerPr(pullRequests);
        setValue(calculatedAverage);
      } catch (error) {
        console.log('Error fetching average PR reviews:', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [pullRequests, isLoadingPullRequests]);

  return (
    <StatsCard
      title="Average Reviews per PR"
      value={value ?? '-'}
      isBusy={isLoading || isLoadingPullRequests}
    />
  );
}
