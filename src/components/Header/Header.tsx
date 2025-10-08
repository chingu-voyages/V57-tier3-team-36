'use client';

import RepoDropdown from '@/components/Header/RepoDropdown';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="w-full p-4">
      <div
        data-label="HeaderContents"
        className="w-full flex items-center justify-between gap-4"
      >
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-accent">Merge</span>
          <span>Force</span>
        </h1>
        {isAuthenticated && <RepoDropdown />}
      </div>
    </header>
  );
}
