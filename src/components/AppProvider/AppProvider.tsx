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
import { api } from '@/lib/github/client';
import { handleClientRequest } from '@/lib/github/handleClientRequest';
import { githubApiPath } from '@/lib/github/constants';
import { fetchRequest } from '@/lib/request';

type RepoEntities = { [id: GitHubRepo['id']]: GitHubRepo };
type PullRequestEntities = { [id: GitHubPullRequest['id']]: GitHubPullRequest };

type ContextValue = {
  repos?: GitHubRepo[];
  pullRequests?: GitHubPullRequest[];
  addRepo?: (githubRepoId: string) => void;
  removeRepo?: (githubRepoId: string) => void;
};

const AppContext = createContext<ContextValue>({});

export default function AppProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  const [repos, setRepos] = useState<RepoEntities>({});
  const [pullRequests, setPullRequests] = useState<PullRequestEntities>({});

  const addRepo = useCallback(() => {}, []);
  const removeRepo = useCallback(() => {}, []);

  const shouldFetch = useRef<boolean>(true);

  // when isAuthenticated is true, fetch repos & pull requests
  useEffect(() => {
    if (!shouldFetch.current || !isAuthenticated || !user) return;
    shouldFetch.current = false;

    // Limited to the first page of up to 100 results
    const fetchPullRequests = async ({
      repoOwner,
      repoName,
    }: {
      repoOwner: string;
      repoName: string;
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

      const pullRequestEntities = pullRequestsResponse.data.reduce(
        (previousValue, currentValue) => {
          previousValue[currentValue.id] = currentValue;
          return previousValue;
        },
        {} as PullRequestEntities
      );

      setPullRequests(pullRequestEntities);
    };

    const fetchRepos = async (userId: string) => {
      const reposResponse = await fetch(`/api/users/${userId}/repos`);
      const reposData: GitHubRepo[] = await reposResponse.json();

      const repoEntities = reposData.reduce((previousValue, currentValue) => {
        previousValue[currentValue.id] = currentValue;
        return previousValue;
      }, {} as RepoEntities);

      setRepos(repoEntities);
      setPullRequests({});

      for (const repoData of reposData) {
        fetchPullRequests({
          repoOwner: repoData.owner.login,
          repoName: repoData.name,
        });
      }
    };

    // fetch repos and pull requests
    fetchRepos(user.id);
  }, [isAuthenticated, user]);

  // when isAuthenticated is falsey, clear repos & pull requests
  useEffect(() => {
    if (isAuthenticated) return;
    setRepos({});
    setPullRequests({});
  }, [isAuthenticated]);

  // on addRepo/removeRepo ... ? either fetch/refetch or modify in place
  // shouldFetch.current = false;

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
