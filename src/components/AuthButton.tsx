'use client';

import { useAuth } from '@/hooks/useAuth';

export function AuthButton() {
  const { user, loading, signOut, signIn, isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <span className="text-sm text-gray-600">
          Welcome, {user.name || user.email}!
        </span>
      ) : null}

      <button
        disabled={loading}
        onClick={loading ? undefined : isAuthenticated ? signOut : signIn}
        className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-blue-800 cursor-pointer w-80"
      >
        {loading ? (
          <>Loading...</>
        ) : isAuthenticated ? (
          <>Sign Out</>
        ) : (
          <>Login with GitHub</>
        )}
      </button>
    </>
  );
}
