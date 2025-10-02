'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { GitHubAvatar } from '@/components/GitHubAvatar';
import SidebarIcon from './SidebarIcon';
import SidebarItem from './SidebarItem';

export default function Sidebar({ checkboxId }: { checkboxId: string }) {
  const { user, signOut, signIn, isAuthenticated, loading } = useAuth();

  const [authAction, setAuthAction] = useState<null | 'signin' | 'signout'>(
    null
  );
  const uiLoading = loading || authAction !== null;
  const loadingLabel = authAction === 'signout' ? 'Logging out…' : 'Loading…';

  useEffect(() => {
    if (!loading && authAction === 'signin' && isAuthenticated)
      setAuthAction(null);
    if (!loading && authAction === 'signout' && !isAuthenticated)
      setAuthAction(null);
  }, [loading, isAuthenticated, authAction]);

  return (
    <div className="drawer-side h-screen">
      <label
        htmlFor={checkboxId}
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul
        data-label="Sidebar"
        className="menu text-base-content h-full w-60 p-4 bg-base-100"
      >
        <div className="flex items-center gap-2 mb-4 justify-between text-2xl px-3 font-bold min-h-[40px]">
          {isAuthenticated && (
            <>
              <GitHubAvatar url={user.image!} />
              {user?.name}
            </>
          )}
        </div>

        <div className="flex flex-col gap-1 font-semibold text-lg">
          <SidebarItem label="Home" />
          <SidebarItem label="Commits" />
          <SidebarItem label="Contributors" />
          <SidebarItem label="Reviews" />
          <SidebarItem label="Quality" />
          {uiLoading ? (
            <li>
              <button
                className="w-full justify-between cursor-default select-none text-white"
                aria-busy="true"
                disabled
              >
                <SidebarIcon label="Sign In" />
                <span className="animate-pulse">{loadingLabel}</span>
              </button>
            </li>
          ) : isAuthenticated ? (
            <AuthButton
              action={() => {
                setAuthAction('signout');
                signOut();
              }}
              label="Sign Out"
            />
          ) : (
            <AuthButton
              action={() => {
                setAuthAction('signin');
                signIn();
              }}
              label="Sign In"
            />
          )}
        </div>
      </ul>
    </div>
  );
}

const AuthButton = ({
  action,
  label,
}: {
  action: () => void;
  label: 'Sign In' | 'Sign Out';
}) => {
  return (
    <li>
      <button className="w-full justify-between" onClick={action}>
        <SidebarIcon label={label} />
        {label}
      </button>
    </li>
  );
};
