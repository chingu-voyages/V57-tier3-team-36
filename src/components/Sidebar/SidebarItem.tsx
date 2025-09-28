'use client';

import { usePathname } from 'next/navigation';
import cn from '@/utils/twcn';
import SidebarIcon from './SidebarIcon';

type IconLabel = 'Home' | 'Commits' | 'Contributors' | 'Reviews' | 'Quality';


export default function SidebarItem({ label, disabled = false,}: { label: IconLabel; disabled?: boolean; }) {

  const pathname = usePathname();
  const isActive = pathname === `/${label.toLowerCase()}` || (label === 'Home' && pathname === '/');

  const baseHref = label.toLowerCase() === 'home' ? '/' : `/${label.toLowerCase()}`; // 'href' for sidebar menu links

  return (
    <li>
      <a
        href={disabled ? undefined : baseHref} // If not disabled, 'baseHref' returns url linU for menu item
        aria-disabled={disabled}  // tracks if a menu item is disabled (based on if user is logged in or not)
        className={`${cn(isActive && !disabled && 'menu-active')} flex items-center justify-between ${
          disabled ? 'pointer-events-none select-none outline-none focus:outline-none text-base-content/60' : ''
        }`}
      >
        <SidebarIcon label={label} />
        {label}
      </a>
    </li>
  );
}
