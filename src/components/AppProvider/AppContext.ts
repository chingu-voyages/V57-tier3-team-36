'use client';

import { createContext } from 'react';

export type AppContextValue = {
  repos: GitHubRepo[];
  pullRequests: GitHubPullRequest[];
  addRepo: (githubRepoId: string) => void;
  removeRepo: (githubRepoId: string) => void;
  selectRepo: (repoId: string | undefined) => void;
  isLoadingRepos: boolean;
  isLoadingPullRequests: boolean;
  modalRef: React.RefObject<HTMLDialogElement | null>;
};

export const AppContext = createContext<AppContextValue | null>(null);
