'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useAuth } from '@/hooks/useAuth';
import { githubApiPath } from '@/lib/github/constants';
import { fetchRequest } from '@/lib/request';

type ContextValue = {
  repos?: GitHubRepo[];
  pullRequests?: GitHubPullRequest[];
  addRepo?: (githubRepoId: string) => void;
  removeRepo?: (githubRepoId: string) => void;
};

const AppContext = createContext<ContextValue>({});

export default function AppProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  const [repos, setRepos] = useState<Entities<GitHubRepo>>({});
  const [pullRequests, setPullRequests] = useState<Entities<GitHubPullRequest>>(
    {}
  );

  // (!) Limited to the first page of up to 100 results
  const fetchPullRequests = useCallback(
    async ({
      repoOwner,
      repoName,
      callback,
    }: {
      repoOwner: string;
      repoName: string;
      callback: (current: Entities<GitHubPullRequest>) => void;
    }) => {
      const baseUrl =
        `${process.env.NEXT_PUBLIC_BASE_URL}${githubApiPath}` as const;
      const url = `/repos/${repoOwner}/${repoName}/pulls?state=open&per_page=100`;

      const response = await fetchRequest(`${baseUrl}${url}`, {
        headers: { credentials: 'include' },
      });

      if (!response.ok) {
        console.error(
          `GitHub API request failed: ${response.status} ${response.statusText}`
        );
        return;
      }

      const pullRequestsResponse: {
        success: boolean;
        data: GitHubPullRequest[];
      } = await response.json();

      const entities = pullRequestsResponse.data.reduce(
        (previousValue, currentValue) => {
          previousValue[currentValue.id.toString()] = currentValue;
          return previousValue;
        },
        {} as Entities<GitHubPullRequest>
      );

      callback(entities);
    },
    []
  );

  const fetchRepos = useCallback(
    async ({
      userId,
      callback,
    }: {
      userId: string;
      callback: (current: Entities<GitHubRepo>) => void;
    }) => {
      const reposResponse = await fetch(`/api/users/${userId}/repos`);
      const reposData: GitHubRepo[] = await reposResponse.json();

      const repoEntities = reposData.reduce((previousValue, currentValue) => {
        previousValue[currentValue.id.toString()] = currentValue;
        return previousValue;
      }, {} as Entities<GitHubRepo>);

      callback(repoEntities);
    },
    []
  );

  const addPullRequests = useCallback(
    (pullRequestEntities: Entities<GitHubPullRequest>) => {
      setPullRequests(current => {
        const draft = { ...current };
        Object.values(pullRequestEntities).forEach(pullRequest => {
          draft[pullRequest.id.toString()] = pullRequest;
        });
        return draft;
      });
    },
    []
  );

  const addRepo = useCallback(
    async (githubRepoId: string) => {
      if (!isAuthenticated || !user) return;

      const response = await fetch(`/api/users/${user.id}/repos`, {
        method: 'POST',
        body: JSON.stringify({ githubRepoId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('Failed to add repo');
        // If we fail here, do not proceed.
        return;
      }

      const createRepoResponse: {
        success: boolean;
        data: GitHubRepo;
      } = await response.json();
      const newRepo = createRepoResponse.data;

      // Add repo to state directly (skip refetching all user repos)
      setRepos(current => ({
        ...current,
        [newRepo.id.toString()]: newRepo,
      }));

      // Fetch pull requests for new repo
      // Add pull requests to state directly
      fetchPullRequests({
        repoOwner: newRepo.owner.login,
        repoName: newRepo.name,
        callback: addPullRequests,
      });
    },
    [isAuthenticated, user, addPullRequests, fetchPullRequests]
  );

  const removeRepo = useCallback(
    async (githubRepoId: string) => {
      if (!isAuthenticated || !user) return;
      const response = await fetch(
        `/api/users/${user.id}/repos/${githubRepoId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
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

      // TODO: Remove pull requests from state directly
      setPullRequests(current => {
        const draft = { ...current };
        // filter on object.values to get an array of ids,
        const pullRequestsToRemove = Object.values(draft).filter(
          pullRequest => pullRequest.base.repo.id.toString() === githubRepoId
        );
        // loop through array of ids and delete each one
        pullRequestsToRemove.forEach(pullRequest => {
          delete draft[pullRequest.id.toString()];
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
    shouldFetch.current = false;

    const reposCallback = (repoEntities: Entities<GitHubRepo>) => {
      setRepos(repoEntities);
      setPullRequests({});

      for (const repoData of Object.values(repoEntities)) {
        fetchPullRequests({
          repoOwner: repoData.owner.login,
          repoName: repoData.name,
          callback: addPullRequests,
        });
      }
    };

    // fetch repos and pull requests
    (async () => {
      await fetchRepos({
        userId: user.id,
        callback: reposCallback,
      });
    })();
  }, [isAuthenticated, user, fetchRepos, fetchPullRequests, addPullRequests]);

  // when isAuthenticated is falsey, clear repos & pull requests
  useEffect(() => {
    if (isAuthenticated) return;
    setRepos({});
    setPullRequests({});
  }, [isAuthenticated]);

  const memo = useMemo(
    () => ({
      repos: Object.values(repos),
      pullRequests: Object.values(pullRequests),
      addRepo,
      removeRepo,
    }),
    [repos, pullRequests, addRepo, removeRepo]
  );

  return <AppContext.Provider value={memo}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return {};
  }

  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}
