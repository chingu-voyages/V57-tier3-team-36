'use client';

import { useAuth } from '@/hooks/useAuth';
import * as api from '@/lib/github/api';
import { useEffect } from 'react';

export function AuthButton() {
  const { user, loading, signOut, signIn, isAuthenticated } = useAuth();

  useEffect(() => {
    api.getAuthenticatedGitHubUser().then((data) => {
      console.log({ user: data });
    });
  }, []);

  useEffect(() => {
    api.getUserRepos().then((data) => {
      console.log({ repos: data });
    });
  }, []);

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated ? (
        <span>Welcome, {user.name || user.email}!</span>
      ) : null}

      <button
        className="bg-blue-300 hover:bg-blue-400 px-3 py-1 rounded-md cursor-pointer"
        disabled={loading}
        onClick={loading ? undefined : isAuthenticated ? signOut : signIn}
      >
        {loading ? (
          <>Loading...</>
        ) : isAuthenticated ? (
          <>Sign Out</>
        ) : (
          <>Login with GitHub</>
        )}
      </button>
    </div>
  );
}
