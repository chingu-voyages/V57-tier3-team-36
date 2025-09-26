import ProfileIcon from '@/components/icons/ProfileIcon';
import SidebarItem from './SidebarItem';

export default function Sidebar({ checkboxId }: { checkboxId: string }) {
  return (
    <div className="drawer-side min-h-screen">
      <label
        htmlFor={checkboxId}
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-300 min-h-full w-60 p-4 ">
        <div className="flex items-center gap-2 mb-4 justify-between text-2xl px-3 font-bold">
          <ProfileIcon />
          Jane Doe
        </div>
        <div className="flex flex-col gap-1 font-semibold text-lg">
          <SidebarItem label="Home" />
          <SidebarItem label="Commits" />
          <SidebarItem label="Contributors" />
          <SidebarItem label="Reviews" />
          <SidebarItem label="Quality" />
        </div>
      </ul>
    </div>
  );
}
