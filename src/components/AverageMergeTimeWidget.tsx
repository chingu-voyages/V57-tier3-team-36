'use client';

import { useEffect, useState } from 'react';

type PullRequest = {
  created_at: string;
  merged_at: string | null;
  state: string;
};

type AverageMergeTimeWidgetProps = {
  token?: string;
};

export function AverageMergeTimeWidget({ token }: AverageMergeTimeWidgetProps) {
  const [selectedRepo, setSelectedRepo] = useState<string>('All Repositories');
  const [averageTime, setAverageTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listen for repo changes from the header dropdown
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

  useEffect(() => {
    if (selectedRepo && selectedRepo !== 'All Repositories') {
      fetchMergedPRs();
    } else {
      // Reset when "All Repositories" is selected
      setAverageTime(null);
      setError(null);
    }
  }, [selectedRepo]);

  const fetchMergedPRs = async () => {
    if (!selectedRepo || selectedRepo === 'All Repositories') return;

    // Parse the repo string (assumes format: "owner/repo")
    const [owner, repo] = selectedRepo.split('/');

    if (!owner || !repo) {
      setError('Invalid repository format');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const headers: HeadersInit = {
        Accept: 'application/vnd.github.v3+json',
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&per_page=100&sort=updated&direction=desc`,
        { headers }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Repository not found');
        } else if (response.status === 401) {
          throw new Error('Invalid token');
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const pulls: PullRequest[] = await response.json();

      const mergedPRs = pulls.filter(pr => pr.merged_at !== null);

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
      const avgTimeMs = totalTime / mergeTimes.length;

      setAverageTime(avgTimeMs / (1000 * 60 * 60));
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setLoading(false);
    }
  };

  const formatTime = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    } else if (hours < 24) {
      return `${hours.toFixed(1)} hours`;
    } else {
      const days = Math.floor(hours / 24);
      const remainingHours = Math.round(hours % 24);
      return `${days}d ${remainingHours}h`;
    }
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
