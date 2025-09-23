import { ApprovedCircleCheckIcon } from "@/components/icons/ApprovedCircleCheckIcon";
import { FailedXIcon } from "@/components/icons/FailedXIcon";

export const AutomatedTestStatusBadge = ({
  status,
}: {
  status: "passed" | "failed";
}) => {
  if (status === "failed") {
    return (
      <div className="flex items-center gap-1">
        <FailedXIcon />
        <p className="text-red-500">Failed</p>
      </div>
    );
  }
  if (status === "passed") {
    return (
      <div className="flex items-center gap-1">
        <ApprovedCircleCheckIcon />
        <p className="text-green-500">Passed</p>
      </div>
    );
  }
};
