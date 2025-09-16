"use client";

import { usePathname } from "next/navigation";
import cn from "../utils/twcn";

export default function SidebarItem({ label }: { label: string }) {
    const pathname = usePathname();
    const isActive =
        pathname === `/${label.toLowerCase()}` ||
        (label === "Home" && pathname === "/");

    return (
        <li className={cn(isActive && "bg-primary")}>
            <a
                href={
                    label.toLowerCase() === "home"
                        ? "/"
                        : `/${label.toLowerCase()}`
                }>
                {label}
            </a>
        </li>
    );
}
