import { AuthButton } from "@/components/AuthButton";
import { ReposList } from "@/components/ReposList";

export default function HomePage() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <nav className="flex items-center justify-between px-5 py-3">
                <h1>App Name Goes Here</h1>
                <AuthButton />
            </nav>

            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <ReposList />
            </main>
        </div>
    );
}
