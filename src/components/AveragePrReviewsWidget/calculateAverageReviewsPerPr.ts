import { api } from '@/lib/github/client';
export async function calculateAverageReviewsPerPr(
  userRepos: GitHubRepo[]
): Promise<number> {
  ///const userRepos = await fetchUserRepos();
  const pullRequests = userRepos.map(repo =>
    api.getPullRequestsForRepo({
      owner: repo.owner.login,
      repo: repo.name,
      state: 'open',
    })
  );
  const allPullRequestsAcrossRepos = (await Promise.all(
    pullRequests
  )) as Array<{ data: GitHubPullRequest[] | null; success: boolean }>;

  const flattenedPullRequests = allPullRequestsAcrossRepos.flatMap(
    prs => prs.data || []
  );

  const reviews = flattenedPullRequests.map(pr =>
    api.getReviewsForPullRequest({
      owner: pr.base.repo.owner.login,
      repo: pr.base.repo.name,
      pull_number: pr.number,
    })
  );

  const allReviews = await Promise.allSettled(reviews);
  const successFullReviews = allReviews.filter(
    r => r.status === 'fulfilled'
  ) as PromiseFulfilledResult<{
    data: GitHubPullRequestReview[] | null;
    success: boolean;
  }>[];

  const totalReviews = successFullReviews.reduce((acc, curr) => {
    if (curr.value.success && curr.value.data) {
      return acc + curr.value.data.length;
    }
    return acc;
  }, 0);

  const averageReviews =
    flattenedPullRequests.length > 0
      ? totalReviews / flattenedPullRequests.length
      : 0;

  // setCalculatedAverage(averageReviews);
  return averageReviews;
}
