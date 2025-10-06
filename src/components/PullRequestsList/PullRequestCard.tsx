import Link from 'next/link';
import { relativeTime } from '@/lib/time';
import ConflictsBadge from '@/components/PullRequestsList/ConflictsBadge';

export function PullRequestCard({
  created_at,
  draft,
  title,
  number,
  html_url,
  user,
  repo,
  showConflicts,
  loadingConflicts,
  conflictingFiles,
}: GitHubPullRequest & {
  repo: string;
  showConflicts?: boolean;
  loadingConflicts: boolean;
  conflictingFiles?: string[];
}) {
  const hasConflicts = conflictingFiles && conflictingFiles.length > 0;
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
          <ConflictsBadge
            badgeStyle={badgeStyle}
            loading={loadingConflicts}
            hasConflicts={hasConflicts}
          />
          {draft ? (
            <span className={`${badgeStyle} badge-info`}>draft</span>
          ) : null}
        </h1>
        <span className="text-sm font-thin mb-1 opacity-[0.7]">
          {repo} #{number} opened {relativeTime(created_at)} by {user.login}
        </span>
        {showConflicts && hasConflicts ? (
          <div className="text-xs opacity-80">
            <div className="font-semibold mb-1">Conflicting files:</div>
            <ul className="mb-1">
              {conflictingFiles.map(file => (
                <li key={file}>{file}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Link>
    </li>
  );
}
