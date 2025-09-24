// components/insightsBar/cards/AvgMergeTimeCard.tsx
import CardWrapper from "./cardWrapper/cardWrapper";

interface PRData {
  created_at: string;
  merged_at: string | null;
}

export default function AvgMergeTimeCard({ prData }: { prData: PRData }) {
  if (!prData.merged_at) {
    return (
      <CardWrapper title="Average Merge Time">
        Not merged yet
      </CardWrapper>
    );
  }

  const created = new Date(prData.created_at);
  const merged = new Date(prData.merged_at);
  const diffHours = Math.round((merged.getTime() - created.getTime()) / 36e5); // 36e5 = 3,600,000 millisec per hour

  return (
    <CardWrapper title="Average Merge Time">
      {diffHours} hrs
    </CardWrapper>
  );
}
