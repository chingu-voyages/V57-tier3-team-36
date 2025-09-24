// components/insightsBar/cards/TimeToFirstReviewCard.tsx
import CardWrapper from "./cardWrapper/cardWrapper";

interface PRData {
  created_at: string;
  updated_at: string;
  // later we’ll fetch real review info via API
}

export default function TimeToFirstReviewCard({ prData }: { prData: PRData }) {
  // Placeholder logic: pretend first review happened at updated_at
  const created = new Date(prData.created_at);
  const updated = new Date(prData.updated_at);
  const diffHours = Math.round((updated.getTime() - created.getTime()) / 36e5);

  return (
    <CardWrapper title="Time to First Review">
      {diffHours} hrs
    </CardWrapper>
  );
}
