'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { GitHubAvatar } from '../githubAvatar/GitHubAvatar';
import SidebarIcon from './SidebarIcon';
import SidebarItem from './SidebarItem';

export default function Sidebar({ checkboxId }: { checkboxId: string }) {
  const { user, signOut, signIn, isAuthenticated, loading } = useAuth();

  // Lock the UI into a 'loading' state during sign-in/out transitions to prevent component flickering/flashes.
  const [authAction, setAuthAction] = useState<null | 'signin' | 'signout'>(
    null
  );
  const uiLoading = loading || authAction !== null;
  const loadingLabel =
    authAction === 'signin'
      ? 'Logging in…'
      : authAction === 'signout'
        ? 'Logging out…'
        : 'Logging in…';

  // Release the lock once the expected auth state is observed.
  useEffect(() => {
    if (!loading && authAction === 'signin' && isAuthenticated)
      setAuthAction(null);
    if (!loading && authAction === 'signout' && !isAuthenticated)
      setAuthAction(null);
  }, [loading, isAuthenticated, authAction]);

  // Moved AuthButton inside sidebar since setAuthAction() won't work otherwise.
  const AuthButton = ({
    action,
    label,
  }: {
    action: () => void;
    label: 'Sign In' | 'Sign Out';
  }) => {
    return (
      <li>
        <button
          className="w-full justify-between"
          onClick={() => {
            setAuthAction(label === 'Sign In' ? 'signin' : 'signout');
            action();
          }}
          disabled={uiLoading}
        >
          <SidebarIcon label={label} />
          {label}
        </button>
      </li>
    );
  };

  return (
    <div className="drawer-side h-screen">
      <label
        htmlFor={checkboxId}
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu text-base-content h-full w-60 p-4 bg-base-100">
        <div className="flex items-center gap-2 mb-4 justify-between text-2xl px-3 font-bold min-h-[40px]">
          {isAuthenticated && (
            <>
              <GitHubAvatar url={user.image!} />
              {user?.name}
            </>
          )}
        </div>

        <div className="flex flex-col gap-1 font-semibold text-lg">
          <SidebarItem label="Home" disabled={uiLoading || !isAuthenticated} />
          <SidebarItem
            label="Commits"
            disabled={uiLoading || !isAuthenticated}
          />
          <SidebarItem
            label="Contributors"
            disabled={uiLoading || !isAuthenticated}
          />
          <SidebarItem
            label="Reviews"
            disabled={uiLoading || !isAuthenticated}
          />
          <SidebarItem
            label="Quality"
            disabled={uiLoading || !isAuthenticated}
          />

          {uiLoading ? (
            <li>
              <button
                className="w-full justify-between cursor-default select-none text-white"
                aria-busy="true"
                disabled
              >
                {/* keep spacing consistent with icon + label */}
                <SidebarIcon label="Sign In" />
                <span className="animate-pulse">{loadingLabel}</span>
              </button>
            </li>
          ) : isAuthenticated ? (
            <AuthButton action={signOut} label="Sign Out" />
          ) : (
            <AuthButton action={signIn} label="Sign In" />
          )}
        </div>
      </ul>
    </div>
  );
}
