'use client';

import { authClient } from '@/lib/auth-client';

export function SignInButton() {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() =>
        authClient.signIn.social({
          provider: 'github',
          callbackURL: '/dashboard',
        })
      }
    >
      Sign in with GitHub
    </button>
  );
}
