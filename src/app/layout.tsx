import Image from "next/image";
import SidebarItem from "../components/SidebarItem";
import "./globals.css";

if (
    process.env.NODE_ENV === "development" &&
    process.env.ENABLE_API_MOCKING === "true"
) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("../mocks");
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <div className="drawer lg:drawer-open">
                    <input
                        id="my-drawer"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content">
                        <div className="w-full flex p-4 items-center gap-4">
                            <label
                                htmlFor="my-drawer"
                                className="btn btn-primary drawer-button lg:hidden bg-white text-black">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="currentColor">
                                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                                </svg>
                            </label>
                            <h1>App Name</h1>
                        </div>
                        {children}
                    </div>
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
                </div>
            </body>
        </html>
    );
}
