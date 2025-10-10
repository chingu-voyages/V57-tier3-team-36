import { api } from '@/lib/github/client';
export async function calculateAverageReviewsPerPr(
  pullRequests: GitHubPullRequest[]
): Promise<string> {
  // Try to limit the number of concurrent requests to avoid rate limiting
  const MAX_PULL_REQUESTS = 20;
  if (pullRequests.length > MAX_PULL_REQUESTS) {
    pullRequests = pullRequests.slice(0, MAX_PULL_REQUESTS);
  }

  const reviewPromises = await Promise.allSettled(
    pullRequests.map(pr =>
      api.getReviewsForPullRequest({
        owner: pr.base.repo.owner.login,
        repo: pr.base.repo.name,
        pull_number: pr.number,
      })
    )
  );

  return computeAveragePrReviews(reviewPromises, pullRequests);
}

export function computeAveragePrReviews(
  reviewPromises: PromiseSettledResult<Result<GitHubPullRequestReview[]>>[],
  pullRequests: GitHubPullRequest[]
) {
  const totalReviews = reviewPromises
    .filter(r => r.status === 'fulfilled')
    .reduce((acc, curr) => {
      if (curr.value.success && curr.value.data) {
        return acc + curr.value.data.length;
      }
      return acc;
    }, 0);

  const averageReviews =
    pullRequests.length > 0 ? totalReviews / pullRequests.length : 0;

  return averageReviews.toFixed(2);
}
