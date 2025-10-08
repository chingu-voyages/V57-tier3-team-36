'use client';
import StatsCard from '@/components/StatsCard/StatsCard';

import { usePullRequests } from '@/hooks/usePullRequests';
import { useEffect, useState } from 'react';
import { calculateAverageReviewsPerPr } from './calculateAverageReviewsPerPr';

export default function AveragePrReviewsWidget() {
  const [isLoading, setIsLoading] = useState(false);
  const [calculatedAverage, setCalculatedAverage] = useState<string | null>(
    null
  );

  const pullRequests = usePullRequests();

  useEffect(() => {
    calculate();
  }, [pullRequests]);

  const calculate = async () => {
    if (!pullRequests) return;
    try {
      setIsLoading(true);
      const calculatedAverage =
        await calculateAverageReviewsPerPr(pullRequests);
      setCalculatedAverage(calculatedAverage);
    } catch (error) {
      console.log('Error fetching average PR reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <StatsCard
      title="Average Reviews per PR"
      value={calculatedAverage ?? '--'}
      isBusy={isLoading}
    />
  );
}
