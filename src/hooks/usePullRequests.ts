'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/lib/github/client';

type PullRequestConflicts = { [pullRequestNumber: string]: string[] };

export function usePullRequests() {
  const { user, isAuthenticated } = useAuth();
  const [pullRequests, setPullRequests] =
    useState<(GitHubPullRequest & { repo: string; owner: string })[]>();
  const [pullRequestConflicts, setPullRequestConflicts] =
    useState<PullRequestConflicts>({});

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
                owner: repo.owner.login,
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

  useEffect(() => {
    if (!isAuthenticated || !user || !pullRequests || pullRequests.length === 0)
      return;

    const promises = pullRequests.map(pullRequest =>
      api
        .getPullRequestFiles({
          owner: pullRequest.owner,
          repo: pullRequest.repo,
          pull_number: pullRequest.number,
        })
        .then(response => {
          if (!response.success) return;
          return {
            files: response.data,
            pull_number: pullRequest.number,
          };
        })
    );

    Promise.all(promises).then(pullRequestFiles => {
      const conflicts = {} as PullRequestConflicts;

      // Build a map of filename -> PR numbers that touch it
      const fileMap = new Map<string, number[]>();

      pullRequestFiles.forEach(prData => {
        if (!prData) return;

        const prNumber = prData.pull_number;

        prData.files.forEach(item => {
          const filename = item.filename;
          if (!fileMap.has(filename)) {
            fileMap.set(filename, []);
          }
          fileMap.get(filename)!.push(prNumber);
        });
      });

      // Now find conflicts: files that appear in multiple PRs
      fileMap.forEach((prNumbers, filename) => {
        if (prNumbers.length > 1) {
          // This file is in multiple PRs - add it to each PR's conflicts
          prNumbers.forEach(prNumber => {
            const key = prNumber.toString();
            if (!conflicts[key]) {
              conflicts[key] = [];
            }
            conflicts[key].push(filename);
          });
        }
      });

      console.log({ conflicts });
      setPullRequestConflicts(conflicts);
    });
  }, [user, isAuthenticated, pullRequests]);

  return { pullRequests, pullRequestConflicts };
}
