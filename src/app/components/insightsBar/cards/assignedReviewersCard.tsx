// components/insightsBar/cards/AssignedReviewersCard.tsx
import CardWrapper from "./cardWrapper/cardWrapper";
import { FaGithub } from "react-icons/fa";

interface Reviewer {
  login: string;
  avatar_url?: string;
  html_url?: string;
}

interface PRData {
  requested_reviewers?: Reviewer[];
}

export default function AssignedReviewersCard({ prData }: { prData: PRData }) {
  const reviewers = prData.requested_reviewers || [];

  return (
    <CardWrapper title="Assigned Reviewers">
      {reviewers.length === 0 ? (
        <span className="text-gray-500 text-sm">None Assigned</span>
      ) : (
        <div className="flex flex-col gap-2 w-full h-[80px] overflow-y-auto pr-1">
          {reviewers.map((reviewer, idx) => (
            <a
              key={idx}
              href={reviewer.html_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-600"
            >
              {reviewer.avatar_url && (
                <img
                  src={reviewer.avatar_url}
                  alt={reviewer.login}
                  className="w-6 h-6 rounded-full"
                />
              )}
              <FaGithub className="text-gray-700" />
              <span className="text-gray-800 text-sm font-medium">
                {reviewer.login}
              </span>
            </a>
          ))}
        </div>
      )}
    </CardWrapper>
  );
}
