import Link from "next/link";

export default function Home() {
  return (
    <nav className="text-2xl">
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="/list-repos">List Repositories</Link>
        </li>
        <li>
          <Link href="/list-prs">List Pull Requests</Link>
        </li>
      </ul>
    </nav>
  );
}
