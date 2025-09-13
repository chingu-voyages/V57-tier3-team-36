import Link from "next/link";

export default function Home() {
  return (
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
  );
}
