import { AuthButton } from "@/components/AuthButton";
import { ReposList } from "@/components/ReposList";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <nav className="flex items-center justify-between px-5 py-3">
        <h1>App Name Goes Here</h1>
        <AuthButton />
      </nav>
      <nav className="text-2xl">
        <ul className="flex flex-col gap-4">
          <li>
            <Link href="/repos/list">List Repositories</Link>
          </li>
          <li>
            <Link href="/repos/prs/status/open/list">
              List Open Pull Requests
            </Link>
          </li>
          <li>
            <Link href="/repos/prs/status/closed/list">
              List Closed Pull Requests
            </Link>
          </li>
          <li>
            <Link href="/repos/contributors">List Contributors</Link>
          </li>
          <li>
            <Link href="/repos/branches">List Branches</Link>
          </li>
        </ul>
      </nav>
      <ReposList />
    </div>
  );
}
