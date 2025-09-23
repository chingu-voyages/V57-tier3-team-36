import { GitHubAvatar } from "@/components/githubAvatar/GitHubAvatar";
import { ApprovedCircleCheckIcon } from "@/components/icons/ApprovedCircleCheckIcon";
import { RequestedChangesIcon } from "@/components/icons/RequestedChangesIcon";

export const PrReviewStateBadge = ({
  avatar_url,
  state,
}: {
  avatar_url: string;
  state: string;
}) => {
  const renderBadge = (state: string) => {
    if (state === "APPROVED") {
      return (
        <div className="badge badge-success flex">
          <ApprovedCircleCheckIcon />
          <p>Approved</p>
        </div>
      );
    }
    if (state === "CHANGES_REQUESTED") {
      return (
        <div className="badge badge-error flex">
          <RequestedChangesIcon /> Requested Changes
        </div>
      );
    }
    if (state === "COMMENTED") {
      return <div className="badge badge-info">Commented</div>;
    }
    return null;
  };
  return (
    <div className="flex items-center gap-2">
      <GitHubAvatar url={avatar_url} />
      {renderBadge(state)}
    </div>
  );
};
