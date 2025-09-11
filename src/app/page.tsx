import Link from "next/link";

export default function Home() {
  return (
    <nav className="text-2xl">
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/repos/list">List Repositories</Link>
        </li>
        <li>
          <Link href="/repos/prs/list">List Pull Requests</Link>
        </li>
        <li>
          <Link href="/repos/contributors">List Contributors</Link>
        </li>
      </ul>
    </nav>
  );
}
