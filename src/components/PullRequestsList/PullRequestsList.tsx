'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';
import type { Repo } from '@/db/schema';

export default function PullRequestsList() {
  const { user, isAuthenticated } = useAuth();
  const [pullRequests, setPullRequests] = useState<GitHubPullRequest[]>([]);

  // getPullRequestsForRepo

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const usernamePromise = api
      .getAuthenticatedGitHubUser()
      .then(authenticatedUser => authenticatedUser.login);

    const pullRequestsPromise = usernamePromise.then(username =>
      fetch(`/api/users/${user.id}/repos`)
        .then(response => {
          return response.json();
        })
        .then(repos => {
          // setRepos(repos);
          if (repos.length === 0) return;

          // Fetch all pull requests in parallel
          const promises = repos.map((repo: Repo) =>
            api.getPullRequestsForRepo({
              owner: username,
              repo: repo.id,
            })
          );

          return Promise.all(promises);
        })
    );

    pullRequestsPromise.then(pullRequests => {
      console.log({ pullRequests });
    });
  }, [user, isAuthenticated]);

  return (
    <div
      data-label="PullRequestsList"
      className="flex-grow w-full px-3 py-2 bg-[blue] overflow-y-auto"
    >
      List of Pull Requests {pullRequests.length}
    </div>
  );
}
