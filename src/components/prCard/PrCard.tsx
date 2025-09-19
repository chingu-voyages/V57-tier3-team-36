import { AutomatedTestStatusBadge } from "@/components/prCard/AutomatedTestStatusBadge";

import { CommitsCounter } from "@/components/prCard/CommitsCounter";
import { PrReviewStateBadge } from "@/components/prCard/PrReviewStateBadge";
import { PrStatusBadge } from "@/components/prCard/PrStatusBadge";
import { ReviewCommentsCounter } from "@/components/prCard/ReviewCommentsCounter";
import { UserAvatar } from "@/components/prCard/UserAvatar";
import Link from "next/link";

const MAX_BODY_LENGTH = 100;

type PullRequestCardProps = {
  // These props should be on the main GitHubPullRequest object
  html_url: string;
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
  commits?: number;
  review_comments?: number;

  // TODO: computedProps are derived from other API calls - should we separate these out this way?
  computedProps?: {
    //  GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews to get reviews and then compute the reviewState from that data
    reviews?: {
      // This could be an array of reviews, but for now we just need the latest review
      // Review state is computed by the reviews array that we get from the above API call mentioned
      // TODO: I used camelCase here to differentiate from the GitHub API response, but should we just stick to one style?
      state?: "APPROVED" | "CHANGES_REQUESTED" | "COMMENTED";
      user: {
        avatarUrl: string;
      };
    };
  };
};

export function PrCard({
  title,
  state,
  body,
  number,
  merged_at,
  labels,
  user,
  commits,
  review_comments,
  html_url,
  computedProps,
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
          {/* TODO: discuss how this is derived - it is hard-coded */}
          <AutomatedTestStatusBadge status="passed" />
        </div>
        <Link href={html_url} target="_blank" rel="noopener noreferrer">
          <h2 className="card-title text-2xl">
            <span className="font-thin">#{number}</span>
            {title}
          </h2>
        </Link>
        <p>{shortenBody(body)}</p>
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
          <div>
            <PrReviewStateBadge
              avatar_url={computedProps?.reviews?.user.avatarUrl || ""}
              state={computedProps?.reviews?.state || ""}
            />
            {/* TODO: last updated needs to be displayed here */}
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
