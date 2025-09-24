
// components/insightsBar/cards/MostActiveMemberCard.tsx
import CardWrapper from "./cardWrapper/cardWrapper";

interface PRData {
  user: {
    login: string;
    avatar_url?: string;
    html_url?: string;
  };
}

export default function MostActiveMemberCard({ prData }: { prData: PRData }) {
  return (
    <CardWrapper title="Most Active Member">
      <div className="flex items-center gap-2">
        {prData.user.avatar_url && (
          <img
            src={prData.user.avatar_url}
            alt={prData.user.login}
            className="w-7 h-7 rounded-full border border-black-100"
          />
        )}
        {prData.user.html_url ? (
          <a
            href={prData.user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium hover:underline text-sm"
          >
            {prData.user.login}
          </a>
        ) : (
          <span className="text-gray-700 font-medium text-sm">
            {prData.user.login}
          </span>
        )}
      </div>
    </CardWrapper>
  );
}
