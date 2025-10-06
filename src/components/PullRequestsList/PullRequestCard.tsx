import Link from 'next/link';
import { relativeTime } from '@/lib/time';

export function PullRequestCard({
  created_at,
  draft,
  title,
  number,
  html_url,
  user,
  repo,
}: GitHubPullRequest & { repo: string }) {
  const badgeStyle = 'badge badge-xs' as const;

  return (
    <li className="min-h-20">
      <Link
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start p-2"
      >
        <h1 className="text-lg flex flex-wrap items-center gap-x-2">
          {title}
          {draft ? (
            <span className={`${badgeStyle} badge-info`}>draft</span>
          ) : null}
        </h1>
        <span className="text-sm font-thin mb-1 opacity-[0.7]">
          {repo} #{number} opened {relativeTime(created_at)} by {user.login}
        </span>
      </Link>
    </li>
  );
}
