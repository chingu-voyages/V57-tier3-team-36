import { getReviewData } from '@/components/AvgTimeToFirstReview/getReviewData';

function formatTime(seconds: number): string {
  const minutes = seconds / 60;
  const hours = seconds / 3600;
  const days = hours / 24;

  if (days > 3) {
    return '+3d';
  }
  if (days >= 1) {
    return `${days.toFixed(1)}d`;
  }
  if (hours >= 1) {
    return `${hours.toFixed(1)}h`;
  }
  return `${minutes.toFixed(1)}m`;
}

function calculateAvgTimeToFirstReview(
  data: {
    pullRequestCreatedAt: string;
    reviewSubmittedAt: string;
  }[]
): number {
  if (data.length === 0) {
    return 0;
  }

  const totalSeconds = data.reduce((sum, item) => {
    const createdAt = new Date(item.pullRequestCreatedAt);
    const submittedAt = new Date(item.reviewSubmittedAt);
    const diffMs = submittedAt.getTime() - createdAt.getTime();
    const diffSeconds = diffMs / 1000;
    return sum + diffSeconds;
  }, 0);

  return Math.ceil(totalSeconds / data.length);
}

export async function getAvgTimeToFirstReview(userId: string): Promise<string> {
  try {
    const data = await getReviewData(userId);
    return formatTime(calculateAvgTimeToFirstReview(data));
  } catch {
    return '--';
  }
}
