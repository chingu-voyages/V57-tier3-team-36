// components/insightsBar/cards/prAuthorCard.tsx
import CardWrapper from "./cardWrapper/cardWrapper";

interface User {
  login: string;
  avatar_url: string;
  html_url?: string;   // ⬅️ add this
}

interface PRData {
  user?: User | null;   // main PR author (usually one)
  // if you expect multiple authors in some cases:
  co_authors?: User[];
}

export default function PRAuthorCard({ prData }: { prData: PRData }) {
  const authors: User[] = [];

  // Add main PR author if available
  if (prData.user) {
    authors.push(prData.user);
  }

  // Add optional co-authors if provided
  if (prData.co_authors && prData.co_authors.length > 0) {
    authors.push(...prData.co_authors);
  }

  return (
    <CardWrapper title="PR Author">
      <div className="flex flex-col items-center justify-center gap-2 w-full h-[80px] overflow-y-auto">
        {authors.map((author, idx) => (
            <div key={idx} className="flex items-center gap-2">
                <img
                src={author.avatar_url}
                alt={author.login}
                className="w-6 h-6 rounded-full"
                />
                {author.html_url ? (
                <a
                    href={author.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline text-sm"
                >
                    {author.login}
                </a>
                ) : (
                <span className="text-sm">{author.login}</span>
                )}
            </div>
            ))}
      </div>
    </CardWrapper>
  );
}
