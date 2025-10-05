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
  isHighlighted,
  onHighlight,
  onClearHighlight,
  hasConflicts,
  conflictingFiles,
}: GitHubPullRequest & {
  repo: string;
  isHighlighted?: boolean;
  onHighlight: () => void;
  onClearHighlight: () => void;
  hasConflicts: boolean;
  conflictingFiles: string[];
}) {
  return (
    <li
      className="min-h-20"
      onMouseEnter={onHighlight}
      onMouseLeave={onClearHighlight}
    >
      <Link
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex flex-col items-start p-2 ${isHighlighted ? 'menu-active' : ''}`}
      >
        <h1 className="text-lg flex flex-wrap items-center gap-x-2">
          {title}
          {hasConflicts ? (
            <span className="badge badge-error badge-xs">conflict</span>
          ) : (
            <span className="badge badge-success badge-xs">no conflicts</span>
          )}
          {draft ? (
            <span className="badge badge-info badge-xs">draft</span>
          ) : null}
        </h1>
        <span className="text-sm font-thin mb-1 opacity-[0.7]">
          {repo} #{number} opened {relativeTime(created_at)} by {user.login}
        </span>
        {conflictingFiles.length > 0 && (
          <div className="mt-2 text-xs opacity-80">
            <div className="font-semibold mb-1">Conflicting files:</div>
            <ul className="list-disc list-inside space-y-0.5">
              {conflictingFiles.map(file => (
                <li key={file} className="truncate">
                  {file}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Link>
    </li>
  );
}
