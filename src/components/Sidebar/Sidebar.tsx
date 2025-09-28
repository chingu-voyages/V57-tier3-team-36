import ProfileIcon from '../icons/ProfileIcon';
import SidebarItem from './SidebarItem';

export default function Sidebar() {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu text-base-content min-h-full w-60 p-4 bg-base-100">
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
