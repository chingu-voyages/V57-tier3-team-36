'use client';

import { useAuth } from '@/hooks/useAuth';
import { GitHubAvatar } from '@/components/GitHubAvatar/GitHubAvatar';
import AuthButton from '@/components/Sidebar/AuthButton';
import SidebarItem from './SidebarItem';

export default function Sidebar({ checkboxId }: { checkboxId: string }) {
  const { user, isAuthenticated } = useAuth();

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
          <li>
            <AuthButton />
          </li>
        </div>
      </ul>
    </div>
  );
}
