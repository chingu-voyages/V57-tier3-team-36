import { AutomatedTestStatusBadge } from "@/components/prCard/AutomatedTestStatusBadge";

import { CommitsCounter } from "@/components/prCard/CommitsCounter";
import { PrStatusBadge } from "@/components/prCard/PrStatusBadge";
import { ReviewCommentsCounter } from "@/components/prCard/ReviewCommentsCounter";
import { UserAvatar } from "@/components/prCard/UserAvatar";

const MAX_BODY_LENGTH = 100;

type PullRequestCardProps = {
  title: string;
  state: "open" | "closed";
  body?: string;
  number?: number;
  merged_at?: string;
  labels?: Array<{
    id: number;
    name: string;
    color: string;
    description: string;
    node_id: string;
    url: string;
    default: boolean;
  }> | null;
  user?: Partial<GitHubUser>;
  commits?: {
    count?: number;
    commits_url?: string;
  };
  review_comments?: {
    count?: number;
    review_comments_url?: string;
  };
};

export function PRCard({
  title,
  state,
  body,
  number,
  merged_at,
  labels,
  user,
  commits,
  review_comments,
}: PullRequestCardProps) {
  const getPrState = () => {
    if (state === "closed" && merged_at) return "merged";
    return state;
  };
  return (
    <div className="card w-96 lg:w-full bg-base-100 card-md shadow-sm">
      <div className="card-body">
        <div className="pr-card-header flex justify-between">
          {/* header includes the PR state and Ci/CD checks */}
          <PrStatusBadge state={getPrState()} />
          <AutomatedTestStatusBadge status="failed" />
        </div>
        <h2 className="card-title text-2xl">
          <span className="font-thin">#{number}</span>
          {title}
        </h2>
        <p>{shortenBody(body)}</p>

        {/* labels section 
          style property is used instead of tailwind classes because the label colors are dynamic
          and tailwind removes classes that are interpolated in strings
        */}
        {labels && labels.length > 0 && (
          <div>
            {labels.map((label) => (
              <div
                key={label.id}
                className="badge mr-1 mb-1"
                style={{ backgroundColor: `#${label.color}`, color: "white" }}
              >
                {label.name}
              </div>
            ))}
          </div>
        )}
        <footer className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 mt-4">
            <UserAvatar url={user?.avatar_url || ""} />
            <div className="flex justify-start gap-2">
              <ReviewCommentsCounter review_comments={review_comments} />
              <CommitsCounter commits={commits} />
            </div>
          </div>
          <div className="flex">
            <div className="flex"></div>
            <p>{merged_at && merged_at}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

const shortenBody = (body: string | null | undefined) => {
  // Make the body concise for display purposes - strings with more than MAX_BODY_LENGTH characters will be truncated with "..."
  if (!body) return "No description available";
  if (body.length > MAX_BODY_LENGTH)
    return body.slice(0, MAX_BODY_LENGTH - 3) + "...";
  return body;
};
