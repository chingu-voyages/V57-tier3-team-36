'use client';
import StatsCard from '@/components/StatsCard/StatsCard';
import { useAuth } from '@/hooks/useAuth';
import { useRepoService } from '@/hooks/useRepoService';

import { useEffect, useState } from 'react';
import { calculateAverageReviewsPerPr } from './calculateAverageReviewsPerPr';

export default function AveragePrReviewsWidget() {
  const { fetchUserRepos } = useRepoService();
  const [isLoading, setIsLoading] = useState(false);
  const [calculatedAverage, setCalculatedAverage] = useState<string | null>(
    null
  );
  const { user } = useAuth();

  useEffect(() => {
    calculate();
  }, [user]);

  const calculate = async () => {
    if (user) {
      try {
        setIsLoading(true);
        const userRepos = await fetchUserRepos();
        const calculatedAverage = await calculateAverageReviewsPerPr(userRepos);
        setCalculatedAverage(calculatedAverage);
      } catch (error) {
        console.log('Error fetching average PR reviews:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <StatsCard
      title="Average Reviews per PR"
      value={calculatedAverage ?? '--'}
      color="neutral"
      isBusy={isLoading}
    />
  );
}
