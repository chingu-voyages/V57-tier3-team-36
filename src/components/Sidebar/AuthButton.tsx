'use client';

import { useAuth } from '@/hooks/useAuth';
import SignInIcon from '@/icons/SignInIcon';
import SignOutIcon from '@/icons/SignOutIcon';

export default function AuthButton() {
  const { loading, signOut, signIn, isAuthenticated } = useAuth();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // If auth state is loading, do nothing and return.
    if (loading) {
      event.preventDefault();
      return;
    }

    if (isAuthenticated) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <button
      className="w-full items-center gap-3 justify-between"
      disabled={loading}
      onClick={handleClick}
    >
      {loading ? (
        <>Loading...</>
      ) : isAuthenticated ? (
        <>
          <SignOutIcon /> Sign Out
        </>
      ) : (
        <>
          <SignInIcon /> Sign In
        </>
      )}
    </button>
  );
}
