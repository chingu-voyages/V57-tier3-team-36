'use client';
import { useAuth } from '@/hooks/useAuth';
import { GitHubAvatar } from '../githubAvatar/GitHubAvatar';
import SidebarIcon from './SidebarIcon';
import SidebarItem from './SidebarItem';
export default function Sidebar() {
  const { user, signOut, signIn, isAuthenticated } = useAuth();

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu text-base-content min-h-full w-60 p-4 bg-base-100">
        {isAuthenticated && (
          <div className="flex items-center gap-2 mb-4 justify-between text-2xl px-3 font-bold">
            <GitHubAvatar url={user.image!} />
            {user?.name}
          </div>
        )}

        <div className="flex flex-col gap-1 font-semibold text-lg">
          <SidebarItem label="Home" />
          {isAuthenticated ? (
            <>
              <SidebarItem label="Commits" />
              <SidebarItem label="Contributors" />
              <SidebarItem label="Reviews" />
              <SidebarItem label="Quality" />
              <AuthButton action={signOut} label="Sign Out" />
            </>
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
