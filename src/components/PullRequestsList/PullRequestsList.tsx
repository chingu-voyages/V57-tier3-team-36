'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';
import { PrCard } from '@/components/PrCard/PrCard';

export default function PullRequestsList() {
  const { user, isAuthenticated } = useAuth();
  const [pullRequests, setPullRequests] = useState<GitHubPullRequest[]>([]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const promises = fetch(`/api/users/${user.id}/repos`)
      .then(response => {
        return response.json();
      })
      .then(repos => {
        if (repos.length === 0) return;

        // Fetch all pull requests in parallel
        const promises = repos.map((repo: GitHubRepo) =>
          api.getPullRequestsForRepo({
            owner: repo.owner.login,
            repo: repo.name,
          })
        );

        return Promise.all(promises);
      });

    promises
      .then(pullRequests => {
        if (!pullRequests) {
          console.warn('Missing response data');
          return;
        }
        const combined = pullRequests.map(i => i.data).flat();
        setPullRequests(combined);
      })
      .catch(error => {
        console.log({ error });
      });
  }, [user, isAuthenticated]);

  return (
    <div
      data-label="PullRequestsList"
      className="flex flex-col flex-1 gap-2 w-full min-h-0 overflow-y-auto"
    >
      {pullRequests.map(props => (
        <PrCard key={props.id} {...props} />
      ))}
    </div>
  );
}
