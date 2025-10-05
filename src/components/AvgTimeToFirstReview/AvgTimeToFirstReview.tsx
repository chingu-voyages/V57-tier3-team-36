import { getServerSession } from '@/lib/auth/getServerSession';
import StatsCard from '@/components/StatsCard/StatsCard';
import { getAvgTimeToFirstReview } from '@/components/AvgTimeToFirstReview/getAvgTimeToFirstReview';



export default async function AvgTimeToFirstReview() {
  const title = 'Avg Time to First Review' as const;
  const fallback = <StatsCard title={title} value="?" />;

  const { isAuthenticated, user } = await getServerSession();
  if (!isAuthenticated || !user) {
    return fallback;
  }

  try {
    const value = await getAvgTimeToFirstReview(user.id);
    return <StatsCard title={title} value={value} />;
  } catch (error) {
    console.warn(
      'Error fetching review metrics:',
      error instanceof Error ? error.message : error
    );
    return fallback;
  }
}
