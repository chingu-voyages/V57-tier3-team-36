'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRepoService } from '@/hooks/useRepoService';
import { api } from '@/lib/github/client';
import { useEffect } from 'react';
export default function AveragePrReviewsWidget() {
  const { fetchUserRepos } = useRepoService();
  const { user } = useAuth();

  useEffect(() => {
    fetchRepos();
  }, [user]);

  const fetchRepos = async () => {
    if (user) {
      const userRepos = await fetchUserRepos();

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
      console.log('successfully-fetched reviews', successFullReviews);
    }
  };
  return <div>AveragePrReviewsWidget</div>;
}
