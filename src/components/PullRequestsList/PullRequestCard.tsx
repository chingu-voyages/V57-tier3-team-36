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
  if (draft) return null;
  return (
    <li className='min-h-20'>
      <Link
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-start p-2"
      >
        <h1 className="text-lg">{title}</h1>
        <span className="text-sm font-thin mb-1 opacity-[0.7]">
          {repo} #{number} opened {relativeTime(created_at)} by {user.login}
        </span>
      </Link>
    </li>
  );
}
