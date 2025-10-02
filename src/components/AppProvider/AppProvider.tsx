'use client';

import { createContext, useContext, useState } from 'react';
import type { User } from '@/lib/auth/index';

interface AppContextType {
  user: User | null;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: User | null) => void;
  repos: GitHubRepo[];
  // eslint-disable-next-line no-unused-vars
  setRepos: (repos: GitHubRepo[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);

  return (
    <AppContext.Provider value={{ user, setUser, repos, setRepos }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
