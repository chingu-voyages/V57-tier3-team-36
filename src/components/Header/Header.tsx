'use client';

import RepoDropdown from '@/components/Header/RepoDropdown';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="w-full p-4 h-20">
      <div
        data-label="HeaderContents"
        className="w-full flex items-center justify-between gap-4"
      >
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-accent">Merge</span>
            <span>Force</span>
          </h1>
        </Link>
        {isAuthenticated && <RepoDropdown />}
      </div>
    </header>
  );
}
