'use client';

import { useAuth } from '@/hooks/useAuth';
import { GitHubAvatar } from '../githubAvatar/GitHubAvatar';
import SidebarIcon from './SidebarIcon';
import SidebarItem from './SidebarItem';

export default function Sidebar({ checkboxId }: { checkboxId: string }) {
  const { user, signOut, signIn, isAuthenticated, loading } = useAuth();

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
          <SidebarItem label="Home" />
          <SidebarItem label="Commits" />
          <SidebarItem label="Contributors" />
          <SidebarItem label="Reviews" />
          <SidebarItem label="Quality" />
          {loading ? null : isAuthenticated ? (
            <AuthButton action={signOut} label="Sign Out" />
          ) : (
            <AuthButton action={signIn} label="Sign In" />
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
