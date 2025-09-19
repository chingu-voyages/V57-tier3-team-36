"use client";

import { usePathname } from "next/navigation";
import cn from "../../utils/twcn";
import SidebarIcon from "./SidebarIcon";

type IconLabel = "Home" | "Commits" | "Contributors" | "Reviews" | "Quality";

export default function SidebarItem({ label }: { label: IconLabel }) {
    const pathname = usePathname();
    const isActive =
        pathname === `/${label.toLowerCase()}` ||
        (label === "Home" && pathname === "/");

    return (
        <li className={cn(isActive && "bg-primary text-white rounded-lg")}>
            <a
                className="flex items-center justify-between"
                href={
                    label.toLowerCase() === "home"
                        ? "/"
                        : `/${label.toLowerCase()}`
                }>
                <SidebarIcon label={label} />
                {label}
            </a>
        </li>
    );
}
