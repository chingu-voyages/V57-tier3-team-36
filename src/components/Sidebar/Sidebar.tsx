import Image from "next/image";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
    return (
        <div className="drawer-side">
            <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4 bg-white text-black">
                <div className="flex items-center gap-2 mb-4 justify-between text-2xl px-3 font-bold">
                    <Image
                        src="/icons/accountIcon.svg"
                        alt="Account Icon"
                        width={32}
                        height={32}
                    />
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
