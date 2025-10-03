import Link from 'next/link';
import { relativeTime } from '@/lib/time';

export function PullRequestCard({
  created_at,
  draft,
  title,
  number,
  html_url,
  user,
}: GitHubPullRequest) {
  if (draft) return null;
  return (
    <li className="shadow-md bg-base-200">
      <Link
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start py-2"
      >
        <h1 className="text-lg">{title}</h1>
        <span className="text-xs font-thin mb-1 opacity-[0.7]">
          #{number} opened {relativeTime(created_at)} by {user.login}
        </span>
      </Link>
    </li>
  );
}
