'use client';

import { useAuth } from '@/hooks/useAuth';

export function AuthButton() {
  const { user, loading, signOut, signIn, isAuthenticated } = useAuth();

  return (
    <div className="flex items-center gap-3">
      {isAuthenticated ? (
        <span>Welcome, {user.name || user.email}!</span>
      ) : null}

      <button
        className="bg-blue-600  hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 cursor-pointer"
        disabled={loading}
        onClick={loading ? undefined : isAuthenticated ? signOut : signIn}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="loading loading-spinner loading-sm"></div>
            <p>Login with GitHub</p>
          </div>
        ) : isAuthenticated ? (
          <>Sign Out</>
        ) : (
          <>Login with GitHub</>
        )}
      </button>
    </div>
  );
}
