'use client';

import { createContext } from 'react';

export type AppContextValue = {
  repos: GitHubRepo[];
  pullRequests: GitHubPullRequest[];
  addRepo: (githubRepoId: string) => void;
  removeRepo: (githubRepoId: string) => void;
  isLoadingRepos: boolean;
  isLoadingPullRequests: boolean;
};

export const AppContext = createContext<AppContextValue | null>(null);
