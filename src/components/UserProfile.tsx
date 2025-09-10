'use client';

import { authClient } from '@/lib/auth-client';

export function UserProfile() {
  // Get the current value from the atom
  const sessionState = authClient.useSession.get();

  // Now destructure the state
  const { data: session, isPending } = sessionState;

  if (isPending) return <div>Loading...</div>;

  if (!session) {
    return <div>Not signed in</div>;
  }

  return (
    <div>
      <h2>Welcome, {session.user.name}!</h2>
      {session.user.image ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={session.user.image} alt="Profile" />
      ) : null}
      <p>{session.user.email}</p>
      <button onClick={() => authClient.signOut()}>Sign Out</button>
    </div>
  );
}
