'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useAuth } from '@/hooks/useAuth';

import { AppContext } from '@/components/AppProvider/AppContext';
import { fetchPullRequests } from '@/components/AppProvider/fetchPullRequests';
import { fetchRepos } from '@/components/AppProvider/fetchRepos';
import { createRepo } from '@/components/AppProvider/createRepo';
import { deleteRepo } from '@/components/AppProvider/deleteRepo';

export default function AppProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  const [repos, setRepos] = useState<Entities<GitHubRepo>>({});
  const [pullRequests, setPullRequests] = useState<Entities<GitHubPullRequest>>(
    {}
  );
  const [isLoadingRepos, setIsLoadingRepos] = useState<boolean>();
  const [isLoadingPullRequests, setIsLoadingPullRequests] = useState<boolean>();

  const addRepo = useCallback(
    async (githubRepoId: string) => {
      if (!isAuthenticated || !user) return;

      const newRepo = await createRepo({ userId: user.id, githubRepoId });
      if (!newRepo) {
        console.error('Failed to add repo');
        // If we fail here, do not proceed.
        return;
      }

      // Add repo to state directly (skip refetching all user repos)
      setRepos(current => ({
        ...current,
        [newRepo.id.toString()]: newRepo,
      }));

      // Fetch pull requests for new repo
      const newPullRequests = await fetchPullRequests({
        repoOwner: newRepo.owner.login,
        repoName: newRepo.name,
      });

      // Add pull requests to state directly
      setPullRequests(current => {
        const draft = { ...current };
        newPullRequests.forEach(pullRequest => {
          draft[pullRequest.id.toString()] = pullRequest;
        });
        return draft;
      });
    },
    [isAuthenticated, user]
  );

  const removeRepo = useCallback(
    async (githubRepoId: string) => {
      if (!isAuthenticated || !user) return;

      const deleted = deleteRepo({ userId: user.id, githubRepoId });
      if (!deleted) {
        console.error('Failed to remove repo');
        // If we fail here, do not proceed.
        return;
      }

      // Remove repo from state directly
      setRepos(current => {
        const draft = { ...current };
        delete draft[githubRepoId];
        return draft;
      });

      // Remove pull requests from state directly
      setPullRequests(current => {
        const draft = { ...current };

        // Remove each pull request that belongs to the deleted repo
        Object.values(draft).forEach(pullRequest => {
          const id = pullRequest.base.repo.id.toString();
          if (id === githubRepoId) {
            delete draft[id];
          }
        });

        return draft;
      });
    },
    [isAuthenticated, user]
  );

  const shouldFetch = useRef<boolean>(true);

  // when isAuthenticated is true, fetch repos & pull requests
  useEffect(() => {
    if (!shouldFetch.current || !isAuthenticated || !user) return;
    setIsLoadingRepos(true);
    setIsLoadingPullRequests(true);
    setPullRequests({});

    // fetch repos and pull requests
    (async () => {
      if (!shouldFetch.current) return;
      shouldFetch.current = false;
      const reposResult = await fetchRepos({
        userId: user.id,
      });
      const repoEntities = reposResult.reduce((previousValue, currentValue) => {
        previousValue[currentValue.id.toString()] = currentValue;
        return previousValue;
      }, {} as Entities<GitHubRepo>);

      setRepos(repoEntities);
      setIsLoadingRepos(false);

      const promises = [];
      for (const repoData of reposResult) {
        const promise = fetchPullRequests({
          repoOwner: repoData.owner.login,
          repoName: repoData.name,
        });
        promises.push(promise);
        const pullRequestResults = await promise;

        setPullRequests(current => {
          const draft = { ...current };
          pullRequestResults.forEach(pullRequest => {
            draft[pullRequest.id.toString()] = pullRequest;
          });
          return draft;
        });
      }
      Promise.allSettled(promises).then(() => {
        setIsLoadingPullRequests(false);
      });
    })();
  }, [isAuthenticated, user]);

  // when isAuthenticated is falsey, clear repos & pull requests
  useEffect(() => {
    if (isAuthenticated) return;
    setRepos({});
    setPullRequests({});
    setIsLoadingRepos(undefined);
    setIsLoadingPullRequests(undefined);
  }, [isAuthenticated]);

  const memo = useMemo(
    () => ({
      repos: Object.values(repos),
      pullRequests: Object.values(pullRequests),
      addRepo,
      removeRepo,
      isLoadingRepos: isLoadingRepos === true,
      isLoadingPullRequests:
        isLoadingRepos === true || isLoadingPullRequests === true,
    }),
    [
      repos,
      pullRequests,
      addRepo,
      removeRepo,
      isLoadingRepos,
      isLoadingPullRequests,
    ]
  );

  return <AppContext.Provider value={memo}>{children}</AppContext.Provider>;
}
