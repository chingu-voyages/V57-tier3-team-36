'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';
import { PullRequestCard } from '@/components/PullRequestsList/PullRequestCard';

export default function PullRequestsList() {
  const { user, isAuthenticated } = useAuth();
  const [pullRequests, setPullRequests] =
    useState<(GitHubPullRequest & { repo: string })[]>();

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
          api
            .getPullRequestsForRepo({
              owner: repo.owner.login,
              repo: repo.name,
            })
            .then(response => {
              if (!response.success) return;
              return response.data.map(pullRequest => ({
                ...pullRequest,
                repo: repo.name,
              }));
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
        const combined = pullRequests.flat();
        setPullRequests(combined);
      })
      .catch(error => {
        console.log({ error });
      });
  }, [user, isAuthenticated]);

  return (
    <ul
      data-label="PullRequestsList"
      className="menu flex flex-col flex-1 w-full min-h-0 rounded-box outline outline-offset-[-1px] p-0 divide-y flex-nowrap overflow-y-auto"
    >
      {pullRequests ? (
        pullRequests.map(props => <PullRequestCard key={props.id} {...props} />)
      ) : (
        <div className="skeleton h-full w-full"></div>
      )}
    </ul>
  );
}
