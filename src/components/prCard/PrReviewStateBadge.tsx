import { ApprovedCircleCheckIcon } from "@/components/prCard/icons/ApprovedCircleCheckIcon";
import { RequestedChangesIcon } from "@/components/prCard/icons/RequestedChangesIcon";
import { UserAvatar } from "@/components/prCard/UserAvatar";

export const PrReviewStateBadge = ({
  avatar_url,
  state,
}: {
  avatar_url: string;
  state: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <UserAvatar url={avatar_url} />
      {renderBadge(state)}
    </div>
  );
};

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
