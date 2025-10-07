import Link from 'next/link';
import { relativeTime } from '@/lib/time';

export function PullRequestCard(pullRequest: GitHubPullRequest) {
  const badgeStyle = 'badge badge-xs' as const;

  return (
    <li className="min-h-20">
      <Link
        href={pullRequest.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start p-2"
      >
        <h1 className="text-lg flex flex-wrap items-center gap-x-2">
          {pullRequest.title}
          {pullRequest.draft ? (
            <span className={`${badgeStyle} badge-info`}>draft</span>
          ) : null}
          {pullRequest.mergeable ? (
            <span className={`${badgeStyle} badge-success`}>ready</span>
          ) : null}
        </h1>
        <span className="text-sm font-thin mb-1 opacity-[0.7]">
          {pullRequest.base.repo.name} #{pullRequest.number} opened{' '}
          {relativeTime(pullRequest.created_at)} by {pullRequest.user.login}
        </span>
      </Link>
    </li>
  );
}
