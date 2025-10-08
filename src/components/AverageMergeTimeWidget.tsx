'use client';

import { useEffect, useState, useMemo } from 'react';
import { usePullRequests } from '@/hooks/usePullRequests';
import { useRepoService } from '@/hooks/useRepoService';

type AverageMergeTimeWidgetProps = {
  token?: string;
};

export function AverageMergeTimeWidget({ token }: AverageMergeTimeWidgetProps) {
  const [selectedRepo, setSelectedRepo] = useState<string>('All Repositories');
  const [averageTime, setAverageTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pullRequests = usePullRequests();
  const { fetchUserRepos } = useRepoService();

  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  // Fetch user repos once (so we can display repo names)
  useEffect(() => {
    const loadRepos = async () => {
      try {
        const userRepos = await fetchUserRepos();
        setRepos(userRepos);
      } catch (err) {
        console.error('Failed to fetch repos:', err);
      }
    };
    loadRepos();
  }, []);

  // Listen for repo selection events from dropdown
  useEffect(() => {
    const handleRepoChange = (event: CustomEvent) => {
      setSelectedRepo(event.detail.repo);
    };
    window.addEventListener('repoChanged', handleRepoChange as EventListener);
    return () => {
      window.removeEventListener(
        'repoChanged',
        handleRepoChange as EventListener
      );
    };
  }, []);

  // Compute average merge time whenever repo or pull requests change
  useEffect(() => {
    if (!pullRequests) return;
    if (selectedRepo === 'All Repositories') {
      setAverageTime(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Filter PRs for the selected repo
      const filteredPRs = pullRequests.filter(pr => pr.repo === selectedRepo);
      const mergedPRs = filteredPRs.filter(pr => pr.merged_at !== null);

      if (mergedPRs.length === 0) {
        setAverageTime(0);
        setLoading(false);
        return;
      }

      const mergeTimes = mergedPRs.map(pr => {
        const created = new Date(pr.created_at).getTime();
        const merged = new Date(pr.merged_at!).getTime();
        return merged - created;
      });

      const totalTime = mergeTimes.reduce((sum, time) => sum + time, 0);
      const avgTimeMs = totalTime / mergedPRs.length;

      setAverageTime(avgTimeMs / (1000 * 60 * 60)); // Convert to hours
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to calculate average'
      );
      setLoading(false);
    }
  }, [selectedRepo, pullRequests]);

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)} minutes`;
    if (hours < 24) return `${hours.toFixed(1)} hours`;
    const days = Math.floor(hours / 24);
    const remainingHours = Math.round(hours % 24);
    return `${days}d ${remainingHours}h`;
  };

  return (
    <div className="card w-full bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg">Average Merge Time</h3>

        {selectedRepo === 'All Repositories' && (
          <div className="alert alert-info mt-4">
            <span>Select a repository to view average merge time</span>
          </div>
        )}

        {loading && (
          <div className="flex justify-center items-center h-20 mt-4">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}

        {error && (
          <div className="alert alert-error mt-4">
            <span>{error}</span>
          </div>
        )}

        {!loading &&
          !error &&
          selectedRepo !== 'All Repositories' &&
          averageTime !== null && (
            <div className="stat mt-4 bg-base-200 rounded-lg">
              <div className="stat-title">{selectedRepo}</div>
              <div className="stat-value text-3xl">
                {averageTime > 0 ? formatTime(averageTime) : 'No merged PRs'}
              </div>
              <div className="stat-desc">Time from creation to merge</div>
            </div>
          )}
      </div>
    </div>
  );
}
